import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminExportPage() {
  const [databaseId, setDatabaseId] = useState('');
  const [selectedAppointments, setSelectedAppointments] = useState([]);
  const [isExporting, setIsExporting] = useState(false);
  const [exportResults, setExportResults] = useState(null);

  const { data: appointments, isLoading } = useQuery({
    queryKey: ['appointments'],
    queryFn: () => base44.entities.Appointment.list(),
    initialData: []
  });

  const handleExport = async () => {
    if (!databaseId.trim()) {
      toast.error('Por favor ingresa el ID de la base de datos de Notion');
      return;
    }

    setIsExporting(true);
    setExportResults(null);

    try {
      const { data } = await base44.functions.invoke('exportToNotion', {
        database_id: databaseId,
        appointment_id: selectedAppointments.length === 1 ? selectedAppointments[0] : null
      });

      setExportResults(data);
      toast.success(`Exportadas ${data.exported} citas correctamente`);
    } catch (error) {
      toast.error(error.message || 'Error al exportar');
    } finally {
      setIsExporting(false);
    }
  };

  const toggleAppointment = (id) => {
    setSelectedAppointments(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const serviceMap = {
    'green_card': 'Residencia Permanente (Green Card)',
    'ajuste_estatus': 'Ajuste de Estatus',
    'defensa_criminal': 'Defensa Criminal'
  };

  const statusMap = {
    'pending': 'Pendiente',
    'contacted': 'Contactado',
    'scheduled': 'Agendada',
    'completed': 'Completada'
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Exportar a Notion</h1>
          <p className="text-slate-600">Exporta las notas de consulta a tu base de datos de Notion</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Configuration */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Configuración</CardTitle>
                <CardDescription>ID de la base de datos de Notion</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="database-id">Database ID</Label>
                  <Input
                    id="database-id"
                    placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                    value={databaseId}
                    onChange={(e) => setDatabaseId(e.target.value)}
                    className="mt-1.5"
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    Encuentra el ID en la URL de tu base de datos de Notion
                  </p>
                </div>

                <div>
                  <Label>Citas seleccionadas</Label>
                  <p className="text-sm text-slate-600 mt-1">
                    {selectedAppointments.length === 0
                      ? 'Todas las citas'
                      : `${selectedAppointments.length} cita(s) seleccionada(s)`}
                  </p>
                </div>

                <Button
                  onClick={handleExport}
                  disabled={isExporting || !databaseId.trim()}
                  className="w-full"
                >
                  {isExporting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Exportando...
                    </>
                  ) : (
                    'Exportar a Notion'
                  )}
                </Button>

                {exportResults && (
                  <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <h4 className="font-semibold text-sm mb-2">Resultados</h4>
                    <div className="space-y-1 text-xs">
                      <p className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-3 h-3" />
                        Exitosas: {exportResults.exported}
                      </p>
                      {exportResults.failed > 0 && (
                        <p className="flex items-center gap-2 text-red-600">
                          <XCircle className="w-3 h-3" />
                          Fallidas: {exportResults.failed}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Appointments List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Citas</CardTitle>
                <CardDescription>Selecciona las citas que deseas exportar (opcional)</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
                  </div>
                ) : appointments.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
                    No hay citas registradas
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[600px] overflow-y-auto">
                    {appointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        onClick={() => toggleAppointment(appointment.id)}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedAppointments.includes(appointment.id)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-slate-900 truncate">
                              {appointment.full_name}
                            </h4>
                            <p className="text-sm text-slate-600 mt-0.5">
                              {serviceMap[appointment.service] || appointment.service}
                            </p>
                            <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                              <span>{appointment.phone}</span>
                              {appointment.email && <span>• {appointment.email}</span>}
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                              appointment.status === 'completed' ? 'bg-green-100 text-green-700' :
                              appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                              appointment.status === 'contacted' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-slate-100 text-slate-700'
                            }`}>
                              {statusMap[appointment.status] || appointment.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Export Results Details */}
            {exportResults && exportResults.results.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Detalles de la Exportación</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {exportResults.results.map((result, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {result.success ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600" />
                          )}
                          <div>
                            <p className="text-sm font-medium text-slate-900">
                              Cita {appointments.find(a => a.id === result.appointment_id)?.full_name || result.appointment_id}
                            </p>
                            {result.error && (
                              <p className="text-xs text-red-600 mt-0.5">{result.error}</p>
                            )}
                          </div>
                        </div>
                        {result.notion_url && (
                          <a
                            href={result.notion_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}