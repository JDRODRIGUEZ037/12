import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";

const AuthContext = createContext();

function getStoredValue(key, fallback = null) {
  if (typeof window === "undefined") return fallback;
  const stored = window.localStorage.getItem(key);
  if (!stored) return fallback;
  try {
    return JSON.parse(stored);
  } catch (error) {
    console.warn(`No se pudo parsear el valor almacenado para ${key}`, error);
    return fallback;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getStoredValue("docedigital_token", null));
  const [user, setUser] = useState(() => getStoredValue("docedigital_user", null));
  const [loading, setLoading] = useState(false);
  const apiBase = useMemo(() => process.env.REACT_APP_API_URL || "http://localhost:5000", []);

  const persist = useCallback((newToken, newUser) => {
    if (typeof window === "undefined") return;
    if (newToken) {
      window.localStorage.setItem("docedigital_token", JSON.stringify(newToken));
    } else {
      window.localStorage.removeItem("docedigital_token");
    }
    if (newUser) {
      window.localStorage.setItem("docedigital_user", JSON.stringify(newUser));
    } else {
      window.localStorage.removeItem("docedigital_user");
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    persist(null, null);
  }, [persist]);

  const fetchProfile = useCallback(
    async (authToken) => {
      try {
        const response = await fetch(`${apiBase}/api/auth/profile`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("No autorizado");
        }
        const data = await response.json();
        if (data?.user) {
          setUser(data.user);
          persist(authToken, data.user);
        }
      } catch (error) {
        console.warn("Token inválido, cerrando sesión.", error);
        logout();
      } finally {
        setLoading(false);
      }
    },
    [apiBase, logout, persist]
  );

  useEffect(() => {
    let cancelled = false;
    if (token && !user) {
      setLoading(true);
      fetchProfile(token).finally(() => {
        if (!cancelled) setLoading(false);
      });
    }
    return () => {
      cancelled = true;
    };
  }, [token, user, fetchProfile]);

  const login = useCallback(
    async (emailOrUsername, password) => {
      setLoading(true);
      try {
        const identifier = (emailOrUsername || '').trim();
        const response = await fetch(`${apiBase}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: identifier, username: identifier, password }),
        });

        if (!response.ok) {
          const errorBody = await response.json().catch(() => ({}));
          throw new Error(errorBody.message || "No se pudo iniciar sesión");
        }

        const data = await response.json();
        setToken(data.token);
        setUser(data.user);
        persist(data.token, data.user);
        return data.user;
      } finally {
        setLoading(false);
      }
    },
    [apiBase, persist]
  );

  const value = useMemo(
    () => ({
      apiBase,
      token,
      user,
      login,
      logout,
      loading,
      isAuthenticated: Boolean(token && user),
    }),
    [apiBase, token, user, login, logout, loading]
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
