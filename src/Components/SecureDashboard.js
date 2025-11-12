import React from "react";
import { AuthProvider, useAuth } from "./AuthContext";
import LoginForm from "./LoginForm";
import PublicationsManager from "./PublicationsManager";
import "./SecureDashboard.css";

function DashboardBody() {
  const { isAuthenticated, user, logout, loading } = useAuth();

  return (
    <div className="secure-dashboard">
      <header className="dashboard-header">
        <div>
          <h1>DOCE Digital - Gestión segura</h1>
          <p className="muted">
            Accede con tu correo corporativo para administrar publicaciones, probar el trigger y exportar datos según tus
            privilegios.
          </p>
        </div>
        {isAuthenticated ? (
          <div className="user-pill">
            <div>
              <span className="user-name">{user?.fullName || user?.email || user?.username}</span>
              <span className="user-role">Rol: {user?.role || "sin rol"}</span>
            </div>
            <button type="button" className="ghost" onClick={logout}>
              Cerrar sesión
            </button>
          </div>
        ) : null}
      </header>

      {!isAuthenticated ? (
        <div className="login-wrapper">
          {loading ? <div className="muted">Validando sesión...</div> : <LoginForm />}
        </div>
      ) : (
        <PublicationsManager />
      )}
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
