import React, { createContext, useContext, useMemo } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const value = useMemo(
    () => ({
      apiBase: "http://localhost:5000",
      token: "mocked-token-no-backend",
      user: { 
        username: "Usuario Admin", 
        role: "admin",
        permissions: {
          canCreate: true,
          canUpdate: true,
          canDelete: true,
          canExport: true,
          canManageTriggers: true
        }
      },
      login: async () => {},
      logout: () => {},
      loading: false,
      isAuthenticated: true,
    }),
    []
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
