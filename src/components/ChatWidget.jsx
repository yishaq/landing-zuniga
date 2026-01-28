import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [conversationId, setConversationId] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const messagesEndRef = useRef(null);
  const queryClient = useQueryClient();

  // Get or create conversation
  useEffect(() => {
    const initChat = async () => {
      try {
        const user = await base44.auth.me();
        if (user) {
          setUserName(user.full_name || 'Usuario');
          setUserEmail(user.email);
          
          // Find existing active conversation
          const conversations = await base44.entities.ChatConversation.filter({
            created_by: user.email,
            status: 'active'
          });
          
          if (conversations.length > 0) {
            setConversationId(conversations[0].id);
          }
          setIsInitialized(true);
        }
      } catch (error) {
        setIsInitialized(true);
      }
    };

    if (isOpen && !isInitialized) {
      initChat();
    }
  }, [isOpen, isInitialized]);

  // Fetch messages
  const { data: messages = [] } = useQuery({
    queryKey: ['chat-messages', conversationId],
    queryFn: async () => {
      if (!conversationId) return [];
      const msgs = await base44.entities.ChatMessage.filter(
        { conversation_id: conversationId },
        '-created_date'
      );
      return msgs.reverse();
    },
    enabled: !!conversationId && isOpen,
    refetchInterval: 3000
  });

  // Subscribe to real-time updates
  useEffect(() => {
    if (!conversationId || !isOpen) return;

    const unsubscribe = base44.entities.ChatMessage.subscribe((event) => {
      if (event.data?.conversation_id === conversationId) {
        queryClient.invalidateQueries({ queryKey: ['chat-messages', conversationId] });
      }
    });

    return unsubscribe;
  }, [conversationId, isOpen, queryClient]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Mark messages as read when opened
  useEffect(() => {
    if (isOpen && conversationId && messages.length > 0) {
      const unreadMessages = messages.filter(m => m.is_admin && !m.read);
      unreadMessages.forEach(async (msg) => {
        await base44.entities.ChatMessage.update(msg.id, { read: true });
      });
    }
  }, [isOpen, conversationId, messages]);

  const sendMessageMutation = useMutation({
    mutationFn: async (text) => {
      let convId = conversationId;

      // Create conversation if needed
      if (!convId) {
        const conv = await base44.entities.ChatConversation.create({
          user_name: userName || 'Usuario',
          user_email: userEmail || '',
          status: 'active',
          last_message: text,
          last_message_at: new Date().toISOString(),
          unread_admin_count: 1,
          unread_user_count: 0
        });
        convId = conv.id;
        setConversationId(convId);
      } else {
        // Update conversation
        await base44.entities.ChatConversation.update(convId, {
          last_message: text,
          last_message_at: new Date().toISOString(),
          unread_admin_count: (messages.filter(m => m.is_admin && !m.read).length + 1)
        });
      }

      // Create message
      await base44.entities.ChatMessage.create({
        conversation_id: convId,
        sender_name: userName || 'Usuario',
        sender_email: userEmail || '',
        message: text,
        is_admin: false,
        read: false
      });
    },
    onSuccess: () => {
      setMessage('');
      queryClient.invalidateQueries({ queryKey: ['chat-messages', conversationId] });
    },
    onError: () => {
      toast.error('Error al enviar mensaje');
    }
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    if (!userName) {
      toast.error('Por favor ingresa tu nombre');
      return;
    }

    sendMessageMutation.mutate(message);
  };

  if (isMinimized) {
    return (
      <Button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-xl bg-amber-600 hover:bg-amber-700"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-96 h-[600px] z-50"
          >
            <Card className="h-full flex flex-col shadow-2xl">
              {/* Header */}
              <div className="bg-amber-600 text-white p-4 rounded-t-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  <div>
                    <h3 className="font-semibold">Chat en Vivo</h3>
                    <p className="text-xs opacity-90">Estamos aquí para ayudarte</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMinimized(true)}
                    className="text-white hover:bg-amber-700 h-8 w-8"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-amber-700 h-8 w-8"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
                {!conversationId && (
                  <div className="text-center py-8">
                    <MessageCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                    <p className="text-slate-600 text-sm">
                      ¡Hola! ¿En qué podemos ayudarte hoy?
                    </p>
                  </div>
                )}

                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.is_admin ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[75%] rounded-lg px-4 py-2 ${
                        msg.is_admin
                          ? 'bg-white text-slate-900 border border-slate-200'
                          : 'bg-amber-600 text-white'
                      }`}
                    >
                      <p className="text-xs font-semibold mb-1 opacity-70">
                        {msg.sender_name}
                      </p>
                      <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                      <p className="text-xs mt-1 opacity-60">
                        {new Date(msg.created_date).toLocaleTimeString('es-MX', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t bg-white rounded-b-lg">
                {!userName && (
                  <div className="mb-3 space-y-2">
                    <Input
                      placeholder="Tu nombre"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="text-sm"
                    />
                    <Input
                      placeholder="Tu email (opcional)"
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="text-sm"
                    />
                  </div>
                )}
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    placeholder="Escribe tu mensaje..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    disabled={sendMessageMutation.isPending || !message.trim()}
                    className="bg-amber-600 hover:bg-amber-700"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 rounded-full h-16 w-16 shadow-xl bg-amber-600 hover:bg-amber-700"
        >
          <MessageCircle className="w-7 h-7" />
        </Button>
      )}
    </>
  );
}