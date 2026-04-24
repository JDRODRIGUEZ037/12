import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});

/**
 * EXPLICACIÓN DE LA PRUEBA UNITARIA FRONTEND (Para validación del RAC2)
 * 
 * En esta prueba (Integrante 3) usamos React Testing Library.
 * Aquí no validamos la base de datos ni peticiones reales. El objetivo
 * es dibujar un componente en una "pantalla invisible" de NodeJS (DOM virtual)
 * y simular la interacción del usuario como lo haría un humano: 
 * Buscar un campo por su texto, escribir, y ver si un botón se habilita.
 */

// Simulación del componente CreatePost para la demostración
const CreatePost = () => {
  const [image, setImage] = React.useState('');
  const [caption, setCaption] = React.useState('');
  
  // El botón de publicar solo se habilita si hay imagen Y caption
  const isPublishEnabled = image.trim() !== '' && caption.trim() !== '';

  return (
    <div>
      <input 
        placeholder="URL de la imagen" 
        value={image} 
        onChange={(e) => setImage(e.target.value)} 
      />
      <textarea 
        placeholder="Escribe un caption" 
        value={caption} 
        onChange={(e) => setCaption(e.target.value)} 
      />
      <button disabled={!isPublishEnabled}>
        Publicar
      </button>
    </div>
  );
};

describe('Componente CreatePost (Pruebas Unitarias - Integrante 3)', () => {
  
  it('Prueba #1: Debe mostrar el botón deshabilitado inicialmente', () => {
    // 1. ARRANGE: Renderizamos (dibujamos) el componente en nuestro entorno de prueba
    render(<CreatePost />);
    
    // 2. ACT & ASSERT: Buscamos el botón simulando que leemos la pantalla
    // y comprobamos que tenga la propiedad "disabled" verdadera
    const botonPublicar = screen.getByRole('button', { name: /publicar/i });
    expect(botonPublicar.disabled).toBe(true);
  });

  it('Prueba #2: Debe habilitar el botón cuando hay imagen y texto', () => {
    // 1. ARRANGE
    render(<CreatePost />);
    
    // 2. ACT: Buscamos los inputs y simulamos que tipeamos en ellos
    const inputImagen = screen.getByPlaceholderText(/url de la imagen/i);
    const inputTexto = screen.getByPlaceholderText(/escribe un caption/i);
    
    fireEvent.change(inputImagen, { target: { value: 'https://imagen.com/foto.jpg' } });
    fireEvent.change(inputTexto, { target: { value: 'Hola Instagram!' } });
    
    // 3. ASSERT: Verificamos que el botón reaccionó al cambio y ya no está disabled
    const botonPublicar = screen.getByRole('button', { name: /publicar/i });
    expect(botonPublicar.disabled).toBe(false);
  });
});
