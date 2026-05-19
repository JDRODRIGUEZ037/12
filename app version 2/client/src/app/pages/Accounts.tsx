import { Card } from "../components/ui/card";
import { API_BASE_URL } from '../config';
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { 
  Instagram, 
  Twitter, 
  Facebook, 
  Linkedin,
  Plus,
  Settings,
  TrendingUp,
  Users
} from "lucide-react";

import { useSearchParams } from "react-router";
import { useEffect } from "react";
import { toast } from "sonner";

import { useState } from "react";

export function Accounts() {
  const [searchParams] = useSearchParams();
  const [accounts, setAccounts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchAccounts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/instagram/accounts`);
      if (!response.ok) throw new Error("Error del servidor");
      const data = await response.json();
      setAccounts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching accounts:", error);
      toast.error("No se pudieron cargar las cuentas");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
    const status = searchParams.get("status");
    if (status === "success") {
      toast.success("¡Cuenta de Instagram conectada con éxito!");
    } else if (status === "error") {
      toast.error(`Error al conectar: ${searchParams.get("message") || "Inténtalo de nuevo"}`);
    }
  }, [searchParams]);

  const handleConnect = () => {
    window.location.href = `${API_BASE_URL}/instagram/login`;
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cuentas Conectadas</h1>
          <p className="text-gray-600 mt-1">Gestiona tus perfiles de redes sociales</p>
        </div>
        <Button onClick={handleConnect} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Conectar Cuenta
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Cuentas</p>
              <p className="text-3xl font-bold text-gray-900">{accounts.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Seguidores Totales</p>
              <p className="text-3xl font-bold text-gray-900">
                {accounts.reduce((sum, acc) => sum + (acc.followersCount || 0), 0) >= 1000 
                  ? (accounts.reduce((sum, acc) => sum + (acc.followersCount || 0), 0) / 1000).toFixed(1) + 'K' 
                  : accounts.reduce((sum, acc) => sum + (acc.followersCount || 0), 0)}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Posts Totales</p>
              <p className="text-3xl font-bold text-gray-900">
                {accounts.reduce((sum, acc) => sum + (acc.mediaCount || 0), 0)}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          <div className="col-span-2 text-center py-12">Cargando cuentas...</div>
        ) : accounts.length === 0 ? (
          <div className="col-span-2 text-center py-12 text-gray-500">
            No tienes cuentas conectadas todavía.
          </div>
        ) : (
          accounts.map((account) => {
            const Icon = account.platform === 'instagram' ? Instagram : Facebook;
            const color = account.platform === 'instagram' ? 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600' : 'bg-blue-600';
            
            return (
              <Card key={account.id} className="p-6 overflow-hidden relative group hover:shadow-xl transition-all duration-300 border-gray-100">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`${color} p-0.5 rounded-2xl`}>
                      <div className="bg-white p-1 rounded-[14px]">
                        {account.profilePicture ? (
                          <img 
                            src={account.profilePicture} 
                            className="w-12 h-12 rounded-xl object-cover"
                            alt={account.accountName}
                          />
                        ) : (
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 capitalize flex items-center gap-2">
                        {account.platform}
                        <div className="w-1 h-1 bg-gray-300 rounded-full" />
                        <span className="text-blue-500 text-xs font-normal">Oficial</span>
                      </h3>
                      <p className="text-gray-500 font-medium">@{account.accountName}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-50 text-green-600 border-green-100 hover:bg-green-50">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 animate-pulse" />
                    Conectada
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50 hover:bg-white hover:border-blue-100 transition-colors">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Seguidores</p>
                    <p className="text-2xl font-black text-gray-900">
                      {account.followersCount >= 1000 
                        ? (account.followersCount / 1000).toFixed(1) + 'K' 
                        : account.followersCount || '0'}
                    </p>
                  </div>
                  <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50 hover:bg-white hover:border-purple-100 transition-colors">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Publicaciones</p>
                    <p className="text-2xl font-black text-gray-900">{account.mediaCount || '0'}</p>
                  </div>
                </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" className="flex-1">
                <Settings className="w-4 h-4 mr-2" />
                Configurar
              </Button>
              <Button variant="outline" className="flex-1">
                Ver Detalles
              </Button>
            </div>
          </Card>
            );
          })
        )}
      </div>

      {/* Add New Account Card */}
      <Card className="p-8 mt-6 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
        <div className="text-center">
          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Conectar Nueva Cuenta
          </h3>
          <p className="text-gray-600 mb-4">
            Agrega más perfiles de redes sociales para gestionar todo en un solo lugar
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Conectar Cuenta
          </Button>
        </div>
      </Card>
    </div>
  );
}
