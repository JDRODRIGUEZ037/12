import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Switch } from "../components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { 
  User, Bell, Users, CreditCard, Crown, Check, Trash2, Plus, Lock, Mail 
} from "lucide-react";


export function Settings() {
  const [account, setAccount] = useState<any>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/instagram/accounts`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setAccount(data[0]);
        }
      })
      .catch(err => console.error("Error fetching accounts for settings:", err));
  }, []);

  return (
    <div className="p-8 max-w-5xl mx-auto h-[calc(100vh)] overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Configuración</h1>
        <p className="text-gray-600">Gestiona tu cuenta y preferencias</p>
      </div>

      <Tabs defaultValue="perfil" className="w-full">
        <TabsList className="mb-8 bg-gray-100/80 p-1 flex w-fit h-auto rounded-xl">
          <TabsTrigger value="perfil" className="gap-2 px-5 py-2 text-sm rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <User className="w-4 h-4" /> Perfil
          </TabsTrigger>
          <TabsTrigger value="notificaciones" className="gap-2 px-5 py-2 text-sm rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Bell className="w-4 h-4" /> Notificaciones
          </TabsTrigger>
          <TabsTrigger value="equipo" className="gap-2 px-5 py-2 text-sm rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Users className="w-4 h-4" /> Equipo
          </TabsTrigger>
          <TabsTrigger value="suscripcion" className="gap-2 px-5 py-2 text-sm rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <CreditCard className="w-4 h-4" /> Suscripción
          </TabsTrigger>
        </TabsList>

        {/* Tab: Perfil */}
        <TabsContent value="perfil" className="space-y-6">
          <Card className="p-8 border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Información Personal</h2>
            <div className="flex items-center gap-6 mb-8">
              {account?.profilePicture ? (
                <img 
                  src={account.profilePicture} 
                  alt={account.accountName} 
                  className="w-20 h-20 rounded-full object-cover shadow-sm border border-gray-100 flex-shrink-0" 
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-2xl flex-shrink-0">
                  {account?.accountName ? account.accountName[0].toUpperCase() : "U"}
                </div>
              )}
              <div>
                <Button variant="outline" className="mb-2">Cambiar Foto</Button>
                <p className="text-xs text-gray-500">JPG, PNG o GIF. Máximo 2MB</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Nombre Completo</label>
                <Input defaultValue={account?.accountName ? `@${account.accountName}` : "Usuario Demo"} className="bg-gray-50 border-gray-200" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Correo Electrónico</label>
                <Input defaultValue={account?.accountName ? `${account.accountName}@instagram.com` : "demo@socialhub.com"} className="bg-gray-50 border-gray-200" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Teléfono</label>
                <Input defaultValue={account?.platformUserId ? "+57 300 123 4567" : "+52 123 456 7890"} className="bg-gray-50 border-gray-200" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Empresa</label>
                <Input defaultValue={account?.platformUserId ? "Doce App Inc." : "Mi Empresa"} className="bg-gray-50 border-gray-200" />
              </div>
            </div>
            
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">Guardar Cambios</Button>
          </Card>

          <Card className="p-8 border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Seguridad</h2>
            <div className="space-y-5 mb-8 max-w-md">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Contraseña Actual</label>
                <Input type="password" placeholder="••••••••" className="bg-gray-50 border-gray-200" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Nueva Contraseña</label>
                <Input type="password" placeholder="••••••••" className="bg-gray-50 border-gray-200" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Confirmar Nueva Contraseña</label>
                <Input type="password" placeholder="••••••••" className="bg-gray-50 border-gray-200" />
              </div>
            </div>
            <Button variant="outline" className="border-gray-300">Cambiar Contraseña</Button>
          </Card>

          <Card className="p-8 border-red-200 bg-red-50/50 shadow-sm">
            <h2 className="text-lg font-semibold text-red-700 mb-2">Zona de Peligro</h2>
            <p className="text-sm text-red-600 mb-6">Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, ten cuidado.</p>
            <Button variant="outline" className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800 w-full md:w-auto flex items-center justify-center gap-2">
              <Trash2 className="w-4 h-4" /> Eliminar Cuenta
            </Button>
          </Card>
        </TabsContent>

        {/* Tab: Notificaciones */}
        <TabsContent value="notificaciones" className="space-y-6">
          <Card className="p-8 border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-8">Preferencias de Notificaciones</h2>
            
            <h3 className="text-base font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">Canales de Notificación</h3>
            <div className="space-y-6 mb-10">
              <div className="flex items-center justify-between">
                <div className="flex gap-4 items-start">
                  <Mail className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Correo Electrónico</p>
                    <p className="text-sm text-gray-500">Recibe notificaciones por email</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-4 items-start">
                  <Bell className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Notificaciones Push</p>
                    <p className="text-sm text-gray-500">Recibe notificaciones en tu dispositivo</p>
                  </div>
                </div>
                <Switch />
              </div>
            </div>

            <h3 className="text-base font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">Tipos de Notificaciones</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Post Publicado Exitosamente</p>
                  <p className="text-sm text-gray-500">Cuando un post se publica correctamente</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Error al Publicar</p>
                  <p className="text-sm text-gray-500">Cuando falla una publicación programada</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Nuevos Comentarios</p>
                  <p className="text-sm text-gray-500">Cuando alguien comenta en tus posts</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Menciones</p>
                  <p className="text-sm text-gray-500">Cuando te mencionan en redes sociales</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Tab: Equipo */}
        <TabsContent value="equipo" className="space-y-6">
          <Card className="p-8 border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Miembros del Equipo</h2>
                <p className="text-sm text-gray-500">Gestiona quién tiene acceso a tu espacio de trabajo</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white flex gap-2">
                <Plus className="w-4 h-4" /> Invitar Miembro
              </Button>
            </div>
            
            <div className="space-y-4">
              {/* Member 1 */}
              <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-400 text-white flex items-center justify-center font-bold text-sm">
                    JP
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Juan Pérez</p>
                    <p className="text-xs text-gray-500">juan@empresa.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-sm font-medium text-gray-700">Admin</span>
                  <button className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              
              {/* Member 2 */}
              <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-400 text-white flex items-center justify-center font-bold text-sm">
                    MG
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">María Garcia</p>
                    <p className="text-xs text-gray-500">maria@empresa.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-sm font-medium text-gray-700">Editor</span>
                  <button className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>

              {/* Member 3 */}
              <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-sm">
                    CL
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Carlos López</p>
                    <p className="text-xs text-gray-500">carlos@empresa.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-sm font-medium text-gray-700">Viewer</span>
                  <button className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Tab: Suscripción */}
        <TabsContent value="suscripcion" className="space-y-6">
          {/* Current Plan */}
          <Card className="p-8 border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">Plan Actual</h2>
                <div className="flex items-center gap-3 mt-4 mb-2">
                  <Crown className="w-6 h-6 text-yellow-500" />
                  <h3 className="text-2xl font-bold text-gray-900">Professional</h3>
                </div>
                <p className="text-sm text-gray-600">$49/mes • Renovación el 15 de Abril</p>
              </div>
              <Button variant="outline">Cambiar Plan</Button>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Check className="w-4 h-4 text-green-500" /> 10 cuentas de redes sociales
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Check className="w-4 h-4 text-green-500" /> Posts ilimitados
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Check className="w-4 h-4 text-green-500" /> Analíticas avanzadas
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Check className="w-4 h-4 text-green-500" /> 5 usuarios
              </div>
            </div>
          </Card>

          {/* Plan Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Starter */}
            <Card className="p-8 border-gray-200 shadow-sm flex flex-col">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Starter</h3>
              <div className="flex items-end gap-1 mb-8">
                <span className="text-3xl font-bold text-gray-900">$19</span>
                <span className="text-sm text-gray-500 mb-1">/mes</span>
              </div>
              <div className="space-y-4 mb-8 flex-1">
                <div className="flex items-center gap-2 text-sm text-gray-700"><Check className="w-4 h-4 text-green-500" /> 3 cuentas de redes sociales</div>
                <div className="flex items-center gap-2 text-sm text-gray-700"><Check className="w-4 h-4 text-green-500" /> 30 posts programados</div>
                <div className="flex items-center gap-2 text-sm text-gray-700"><Check className="w-4 h-4 text-green-500" /> Analíticas básicas</div>
                <div className="flex items-center gap-2 text-sm text-gray-700"><Check className="w-4 h-4 text-green-500" /> 1 usuario</div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Cambiar a Starter</Button>
            </Card>

            {/* Professional */}
            <Card className="p-8 border-blue-500 shadow-lg flex flex-col relative scale-[1.02]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                Más Popular
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional</h3>
              <div className="flex items-end gap-1 mb-8">
                <span className="text-3xl font-bold text-gray-900">$49</span>
                <span className="text-sm text-gray-500 mb-1">/mes</span>
              </div>
              <div className="space-y-4 mb-8 flex-1">
                <div className="flex items-center gap-2 text-sm text-gray-700"><Check className="w-4 h-4 text-green-500" /> 10 cuentas de redes sociales</div>
                <div className="flex items-center gap-2 text-sm text-gray-700"><Check className="w-4 h-4 text-green-500" /> Ilimitados posts</div>
                <div className="flex items-center gap-2 text-sm text-gray-700"><Check className="w-4 h-4 text-green-500" /> Analíticas avanzadas</div>
                <div className="flex items-center gap-2 text-sm text-gray-700"><Check className="w-4 h-4 text-green-500" /> 5 usuarios</div>
                <div className="flex items-center gap-2 text-sm text-gray-700"><Check className="w-4 h-4 text-green-500" /> IA incluida</div>
              </div>
              <Button className="w-full bg-gray-100 text-gray-400 cursor-default hover:bg-gray-100">Plan Actual</Button>
            </Card>

            {/* Enterprise */}
            <Card className="p-8 border-gray-200 shadow-sm flex flex-col">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Enterprise</h3>
              <div className="flex items-end gap-1 mb-8">
                <span className="text-3xl font-bold text-gray-900">$99</span>
                <span className="text-sm text-gray-500 mb-1">/mes</span>
              </div>
              <div className="space-y-4 mb-8 flex-1">
                <div className="flex items-center gap-2 text-sm text-gray-700"><Check className="w-4 h-4 text-green-500" /> Ilimitadas cuentas</div>
                <div className="flex items-center gap-2 text-sm text-gray-700"><Check className="w-4 h-4 text-green-500" /> Posts ilimitados</div>
                <div className="flex items-center gap-2 text-sm text-gray-700"><Check className="w-4 h-4 text-green-500" /> Analíticas premium</div>
                <div className="flex items-center gap-2 text-sm text-gray-700"><Check className="w-4 h-4 text-green-500" /> Usuarios ilimitados</div>
                <div className="flex items-center gap-2 text-sm text-gray-700"><Check className="w-4 h-4 text-green-500" /> IA avanzada</div>
                <div className="flex items-center gap-2 text-sm text-gray-700"><Check className="w-4 h-4 text-green-500" /> Soporte prioritario</div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Cambiar a Enterprise</Button>
            </Card>

          </div>

          {/* Payment Method */}
          <Card className="p-8 border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Método de Pago</h2>
            <div className="flex items-center justify-between border border-gray-200 p-4 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-14 h-9 bg-blue-600 rounded flex items-center justify-center text-white font-bold italic text-sm">
                  VISA
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">•••• •••• •••• 4242</p>
                  <p className="text-xs text-gray-500">Expira 12/2027</p>
                </div>
              </div>
              <Button variant="outline">Actualizar</Button>
            </div>
          </Card>

        </TabsContent>
        
      </Tabs>
    </div>
  );
}
