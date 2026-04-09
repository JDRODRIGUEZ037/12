const { Client } = require('pg');

const connectionString = 'postgresql://postgres:p8JyUfH88uA6V42V@[2600:1f16:1cd0:333d:f186:698a:d44c:aeb9]:5432/postgres';

const client = new Client({
  user: 'postgres',
  host: '2600:1f16:1cd0:333d:f186:698a:d44c:aeb9',
  database: 'postgres',
  password: 'p8JyUfH88uA6V42V',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

async function testConnection() {
  try {
    console.log('Intentando conectar a Supabase...');
    await client.connect();
    console.log('✅ ¡CONEXIÓN EXITOSA! Los datos son correctos.');
    const res = await client.query('SELECT table_name FROM information_schema.tables WHERE table_schema = \'public\'');
    console.log('Tablas encontradas:', res.rows.map(r => r.table_name));
    await client.end();
  } catch (err) {
    console.error('❌ ERROR DE CONEXIÓN:', err.message);
    if (err.message.includes('password authentication failed')) {
      console.log('Sugerencia: Revisa si la contraseña "Yo_perreo_sol4" es correcta o si se cambió recientemente.');
    }
  }
}

testConnection();
