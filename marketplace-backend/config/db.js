// config/db.js
const mysql = require('mysql2/promise'); // Importa el módulo mysql2 con soporte para promesas
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env

/**
 * @function connectDB
 * @description Establece una conexión con la base de datos MySQL utilizando las variables de entorno.
 * @returns {Promise<mysql.Connection>} Una promesa que resuelve con el objeto de conexión MySQL.
 * @throws {Error} Si la conexión falla, se registra el error y la aplicación se cierra.
 */
const connectDB = async () => {
    try {
        // Crea una conexión usando las variables de entorno
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,       // Dirección del servidor MySQL
            user: process.env.DB_USER,       // Nombre de usuario de MySQL
            password: process.env.DB_PASSWORD, // Contraseña de MySQL
            database: process.env.DB_NAME      // Nombre de la base de datos MySQL
        });
        console.log(`MySQL Conectado: ${process.env.DB_HOST} (Base de datos: ${process.env.DB_NAME})`);
        return connection; // Retorna la conexión establecida
    } catch (error) {
        console.error(`Error de conexión a MySQL: ${error.message}`);
        // En caso de error de conexión, salimos del proceso para evitar que la aplicación intente continuar sin DB.
        process.exit(1);
    }
};

module.exports = connectDB; // Exporta la función de conexión para usarla en el servidor