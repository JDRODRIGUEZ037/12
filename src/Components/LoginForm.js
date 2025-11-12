import React, { useState } from "react";
import { useAuth } from "./AuthContext";

function LoginForm({ onSuccess }) {
  const { login, loading } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const user = await login(form.username.trim(), form.password);
      if (onSuccess) onSuccess(user);
    } catch (err) {
      setError(err.message || "No se pudo iniciar sesión");
    }
  };

  return (
    <div className="card login-card">
      <h2>Inicia sesión para continuar</h2>
      <p className="muted">
        Introduce tu usuario y contraseña para gestionar publicaciones según tus privilegios.
      </p>
      <form onSubmit={handleSubmit} className="form-grid">
        <label>
          Usuario
          <input
            name="username"
            type="text"
            autoComplete="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Usuario"
            required
          />
        </label>
        <label>
          Contraseña
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            placeholder="Contraseña"
            required
          />
        </label>
        {error ? <div className="error-banner">{error}</div> : null}
        <button type="submit" className="primary" disabled={loading}>
          {loading ? "Validando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
