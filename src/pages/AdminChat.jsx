import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, CheckCircle, Clock, X } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminChatPage() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);
  const queryClient = useQueryClient();

  // Check if user is admin
  const { data: user } = useQuery({
    queryKey: ['current-user'],
    queryFn: () => base44.auth.me()
  });

  const isAdmin = user?.role === 'admin';

  // Fetch conversations
  const { data: conversations = [] } = useQuery({
    queryKey: ['chat-conversations'],
    queryFn: async () => {
      const convs = await base44.entities.ChatConversation.list('-last_message_at');
      return convs;
    },
    enabled: isAdmin,
    refetchInterval: 5000
  });

  // Fetch messages for selected conversation
  const { data: messages = [] } = useQuery({
    queryKey: ['admin-chat-messages', selectedConversation?.id],
    queryFn: async () => {
      if (!selectedConversation) return [];
      const msgs = await base44.entities.ChatMessage.filter(
        { conversation_id: selectedConversation.id },
        '-created_date'
      );
      return msgs.reverse();
    },
    enabled: !!selectedConversation,
    refetchInterval: 3000
  });

  // Subscribe to real-time updates
  useEffect(() => {
    if (!isAdmin) return;

    const unsubscribeConv = base44.entities.ChatConversation.subscribe(() => {
      queryClient.invalidateQueries({ queryKey: ['chat-conversations'] });
    });

    const unsubscribeMsg = base44.entities.ChatMessage.subscribe((event) => {
      if (selectedConversation && event.data?.conversation_id === selectedConversation.id) {
        queryClient.invalidateQueries({ queryKey: ['admin-chat-messages', selectedConversation.id] });
      }
    });

    return () => {
      unsubscribeConv();
      unsubscribeMsg();
    };
  }, [isAdmin, selectedConversation, queryClient]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Mark messages as read
  useEffect(() => {
    if (selectedConversation && messages.length > 0) {
      const unreadMessages = messages.filter(m => !m.is_admin && !m.read);
      unreadMessages.forEach(async (msg) => {
        await base44.entities.ChatMessage.update(msg.id, { read: true });
      });
      
      if (unreadMessages.length > 0) {
        base44.entities.ChatConversation.update(selectedConversation.id, {
          unread_admin_count: 0
        });
      }
    }
  }, [selectedConversation, messages]);

  const sendMessageMutation = useMutation({
    mutationFn: async (text) => {
      await base44.entities.ChatMessage.create({
        conversation_id: selectedConversation.id,
        sender_name: user.full_name || 'Admin',
        sender_email: user.email,
        message: text,
        is_admin: true,
        read: false
      });

      await base44.entities.ChatConversation.update(selectedConversation.id, {
        last_message: text,
        last_message_at: new Date().toISOString(),
        unread_user_count: messages.filter(m => !m.is_admin && !m.read).length + 1
      });
    },
    onSuccess: () => {
      setMessage('');
      queryClient.invalidateQueries({ queryKey: ['admin-chat-messages', selectedConversation.id] });
      queryClient.invalidateQueries({ queryKey: ['chat-conversations'] });
    }
  });

  const closeConversationMutation = useMutation({
    mutationFn: async (convId) => {
      await base44.entities.ChatConversation.update(convId, { status: 'closed' });
    },
    onSuccess: () => {
      toast.success('Conversación cerrada');
      setSelectedConversation(null);
      queryClient.invalidateQueries({ queryKey: ['chat-conversations'] });
    }
  });

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-slate-600">
              No tienes permisos para acceder a esta página
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedConversation) return;
    sendMessageMutation.mutate(message);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Chat en Vivo - Admin</h1>

        <div className="grid lg:grid-cols-3 gap-4 h-[calc(100vh-140px)]">
          {/* Conversations List */}
          <Card className="lg:col-span-1 overflow-hidden flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">Conversaciones</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto space-y-2 p-4">
              {conversations.length === 0 ? (
                <p className="text-center text-slate-500 py-8 text-sm">
                  No hay conversaciones activas
                </p>
              ) : (
                conversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedConversation?.id === conv.id
                        ? 'bg-amber-50 border-2 border-amber-500'
                        : 'bg-white border border-slate-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-semibold text-slate-900 text-sm">
                        {conv.user_name}
                      </p>
                      {conv.unread_admin_count > 0 && (
                        <Badge className="bg-red-500 text-white text-xs">
                          {conv.unread_admin_count}
                        </Badge>
                      )}
                    </div>
                    {conv.user_email && (
                      <p className="text-xs text-slate-500 mb-1">{conv.user_email}</p>
                    )}
                    <p className="text-xs text-slate-600 truncate">{conv.last_message}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className={conv.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-slate-50 text-slate-600'}>
                        {conv.status === 'active' ? 'Activa' : 'Cerrada'}
                      </Badge>
                      <span className="text-xs text-slate-400">
                        {new Date(conv.last_message_at || conv.created_date).toLocaleString('es-MX', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2 flex flex-col">
            {selectedConversation ? (
              <>
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{selectedConversation.user_name}</CardTitle>
                      {selectedConversation.user_email && (
                        <p className="text-sm text-slate-500">{selectedConversation.user_email}</p>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => closeConversationMutation.mutate(selectedConversation.id)}
                      disabled={selectedConversation.status === 'closed'}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cerrar conversación
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.is_admin ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[75%] rounded-lg px-4 py-2 ${
                          msg.is_admin
                            ? 'bg-amber-600 text-white'
                            : 'bg-white text-slate-900 border border-slate-200'
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
                </CardContent>

                <div className="p-4 border-t bg-white">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      placeholder="Escribe tu respuesta..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={selectedConversation.status === 'closed'}
                      className="flex-1"
                    />
                    <Button
                      type="submit"
                      disabled={sendMessageMutation.isPending || !message.trim() || selectedConversation.status === 'closed'}
                      className="bg-amber-600 hover:bg-amber-700"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center text-slate-400">
                  <MessageCircle className="w-16 h-16 mx-auto mb-4" />
                  <p>Selecciona una conversación para empezar</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}