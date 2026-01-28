import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, Circle, Clock, ExternalLink, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function DashboardPage() {
  const { data: onboardingData, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['notion-onboarding'],
    queryFn: async () => {
      const { data } = await base44.functions.invoke('getNotionOnboarding', {});
      return data;
    },
    refetchInterval: 60000 // Refresh every minute
  });

  const getStatusColor = (status) => {
    if (status === 'Done' || status === 'Completado') return 'bg-green-100 text-green-700';
    if (status === 'In progress' || status === 'En progreso') return 'bg-blue-100 text-blue-700';
    if (status === 'Not started' || status === 'No iniciado') return 'bg-slate-100 text-slate-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  const getStatusIcon = (completed) => {
    if (completed) return <CheckCircle className="w-5 h-5 text-green-600" />;
    return <Circle className="w-5 h-5 text-slate-400" />;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
      </div>
    );
  }

  const stats = onboardingData?.stats || {};
  const tasks = onboardingData?.tasks || [];

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard de Onboarding</h1>
            <p className="text-slate-600 mt-1">Progreso del equipo sincronizado desde Notion</p>
          </div>
          <Button
            variant="outline"
            onClick={() => refetch()}
            disabled={isRefetching}
          >
            {isRefetching ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Progress Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total de Tareas</CardDescription>
              <CardTitle className="text-3xl">{stats.total || 0}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Completadas</CardDescription>
              <CardTitle className="text-3xl text-green-600">{stats.completed || 0}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>En Progreso</CardDescription>
              <CardTitle className="text-3xl text-blue-600">{stats.in_progress || 0}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Sin Iniciar</CardDescription>
              <CardTitle className="text-3xl text-slate-600">{stats.not_started || 0}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Progreso General</CardTitle>
              <span className="text-2xl font-bold text-slate-900">{stats.progress_percent || 0}%</span>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={stats.progress_percent || 0} className="h-3" />
          </CardContent>
        </Card>

        {/* Tasks List */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Tareas</CardTitle>
            <CardDescription>Tareas de onboarding del equipo</CardDescription>
          </CardHeader>
          <CardContent>
            {tasks.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                No hay tareas de onboarding
              </div>
            ) : (
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start gap-4 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      {getStatusIcon(task.completed)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <h4 className={`font-semibold text-slate-900 ${task.completed ? 'line-through text-slate-500' : ''}`}>
                          {task.name}
                        </h4>
                        <a
                          href={task.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 flex-shrink-0"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <Badge variant="outline" className={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                        {task.assignee && (
                          <Badge variant="outline" className="bg-slate-100 text-slate-700">
                            {task.assignee}
                          </Badge>
                        )}
                        {task.dueDate && (
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                            <Clock className="w-3 h-3 mr-1" />
                            {new Date(task.dueDate).toLocaleDateString('es-MX', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}