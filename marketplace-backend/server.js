// server.js
const express = require('express');
const connectDB = require('./config/db'); // Importa la función que conecta a la base de datos MySQL
require('dotenv').config(); // Asegúrate de cargar las variables de entorno para usar process.env

const app = express(); // Inicializa la aplicación Express

// Middleware para parsear JSON: Permite que Express entienda el cuerpo de las solicitudes en formato JSON
app.use(express.json());

const cors = require('cors'); // <--- AÑADE ESTA LÍNEA
app.use(cors()); // <--- AÑADE ESTA LÍNEA PARA HABILITAR CORS

// Middleware para parsear JSON: Permite que Express entienda el cuerpo de las solicitudes en formato JSON
app.use(express.json());

let dbConnection; // Declara una variable para almacenar la conexión a la base de datos.
                  // La inicializaremos una vez que la conexión se establezca.

/**
 * @function startServer
 * @description Función asíncrona para iniciar la conexión a la base de datos y luego el servidor Express.
 */
const startServer = async () => {
    try {
        // Intenta conectar a la base de datos y almacena el objeto de conexión
        dbConnection = await connectDB(); 
        
        // --- Rutas de la API ---

        // Ruta principal de prueba: Verifica si el servidor está funcionando y conectado a la DB
        app.get('/', (req, res) => {
            res.send('API de Marketplace está corriendo y conectada a MySQL.');
        });

        // Ejemplo de una ruta para obtener todos los productos de la base de datos
        app.get('/api/products', async (req, res) => {
            try {
                // Ejecuta una consulta SQL para seleccionar todos los productos
                const [rows, fields] = await dbConnection.execute('SELECT * FROM products');
                res.json(rows); // Envía las filas de datos como respuesta JSON
            } catch (error) {
                console.error('Error al obtener productos:', error.message);
                res.status(500).json({ message: 'Error interno del servidor al obtener productos.' });
            }
        });

        // **********************************************
        // NUEVA RUTA: Obtener todas las publicaciones
        // **********************************************
        app.get('/api/publications', async (req, res) => {
            try {
                // Selecciona los campos relevantes de la tabla publications
                const [publications] = await dbConnection.execute(
                    'SELECT publication_id, content, total_likes, total_comments, total_shares FROM publications ORDER BY created_at DESC'
                );
                res.json(publications); // Envía los datos de las publicaciones como JSON
            } catch (error) {
                console.error('Error al obtener publicaciones:', error.message);
                res.status(500).json({ message: 'Error interno del servidor al obtener publicaciones.' });
            }
        });

        // **********************************************
        // RUTA: Obtener todas las publicaciones
        // **********************************************
        app.get('/api/publications', async (req, res) => {
            try {
                // Selecciona los campos relevantes de la tabla publications, incluyendo image_url
                const [publications] = await dbConnection.execute(
                    'SELECT publication_id, content, image_url, total_likes, total_comments, total_shares FROM publications ORDER BY created_at DESC'
                );
                res.json(publications); // Envía los datos de las publicaciones como JSON
            } catch (error) {
                console.error('Error al obtener publicaciones:', error.message);
                res.status(500).json({ message: 'Error interno del servidor al obtener publicaciones.' });
            }
        });

        // Puedes añadir más rutas aquí para Crear, Actualizar, Eliminar (CRUD) productos u otros recursos.
        // Ejemplo de ruta POST para añadir un producto (requerirá un cuerpo JSON con name, description, price, stock)
        /*
        app.post('/api/products', async (req, res) => {
            const { name, description, price, stock } = req.body;
            if (!name || !price) {
                return res.status(400).json({ message: 'Nombre y precio son requeridos.' });
            }
            try {
                const [result] = await dbConnection.execute(
                    'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)',
                    [name, description, price, stock]
                );
                res.status(201).json({ message: 'Producto añadido exitosamente', productId: result.insertId });
            } catch (error) {
                console.error('Error al añadir producto:', error.message);
                res.status(500).json({ message: 'Error al añadir producto.' });
            }
        });
        */


        // Define el puerto en el que el servidor escuchará
        // Si hay una variable de entorno PORT, la usa; de lo contrario, usa 5000 por defecto.
        const PORT = process.env.PORT || 5000; 

        // Inicia el servidor y lo pone a escuchar en el puerto definido
        app.listen(
            PORT,
            () => console.log(`Servidor corriendo en el puerto ${PORT}`)
        );

    } catch (error) {
        // Si hay un error al conectar la DB o al iniciar el servidor, lo registramos y salimos
        console.error('Fallo crítico al iniciar el servidor:', error.message);
        process.exit(1);
    }
};

startServer(); // Llama a la función para iniciar toda la aplicación