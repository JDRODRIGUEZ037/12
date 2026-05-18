const { Client } = require('pg');

const config = {
  user: 'postgres.oyiluylrdtjfluuewmfj',
  host: 'aws-1-us-east-2.pooler.supabase.com',
  database: 'postgres',
  password: 'p8JyUfH88uA6V42V',
  port: 6543,
  ssl: { rejectUnauthorized: false }
};

async function test() {
    for (let i = 1; i <= 5; i++) {
        console.log(`Intento ${i}...`);
        const client = new Client(config);
        try {
            await client.connect();
            const res = await client.query('SELECT table_name FROM information_schema.tables WHERE table_schema = \'public\'');
            console.log('✅ ÉXITO:', res.rows.map(r => r.table_name));
            await client.end();
            break;
        } catch (err) {
            console.log(`❌ ERROR: ${err.message}`);
            await client.end().catch(() => {});
        }
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}

test();
