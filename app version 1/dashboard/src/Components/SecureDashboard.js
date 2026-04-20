import React from "react";
import { AuthProvider, useAuth } from "./AuthContext";
import PublicationsManager from "./PublicationsManager";
import "./SecureDashboard.css";

function DashboardBody() {
  const { user } = useAuth();

  return (
    <div className="secure-dashboard">
      <header className="dashboard-header">
        <div>
          <h1>DOCE Digital - Gestión segura</h1>
          <p className="muted">
            Administra publicaciones y exporta datos.
          </p>
        </div>
        <div className="user-pill">
          <div>
            <span className="user-name">{user?.username}</span>
            <span className="user-role">Rol: {user?.role || "sin rol"}</span>
          </div>
        </div>
      </header>

      <PublicationsManager />
    </div>
  );
}

function SecureDashboard() {
  return (
    <AuthProvider>
      <DashboardBody />
    </AuthProvider>
  );
}

export default SecureDashboard;
