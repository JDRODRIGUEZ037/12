const { Client } = require('pg');

const projectRef = 'oyiluylrdtjfluuewmfj';
const hosts = [
    { host: 'aws-1-us-east-2.pooler.supabase.com', port: 6543, user: `postgres.${projectRef}` },
    { host: 'aws-1-us-east-2.pooler.supabase.com', port: 6543, user: `postgres%2E${projectRef}` },
    { host: 'aws-1-us-east-2.pooler.supabase.com', port: 6543, user: `postgres` },
    { host: 'db.oyiluylrdtjfluuewmfj.supabase.co', port: 5432, user: 'postgres' }
];
const passwords = ['Yo_perreo_sol4', 'Yo_perreo_sola', 'Yo_perreo_solo'];

async function tryConnect(config) {
    const client = new Client({
        ...config,
        database: 'postgres',
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 5000,
    });
    try {
        await client.connect();
        console.log(`✅ SUCCESS: ${config.host}:${config.port} with user ${config.user} and password ${config.password}`);
        const res = await client.query('SELECT NOW()');
        console.log('Result:', res.rows[0]);
        await client.end();
        return true;
    } catch (err) {
        console.log(`❌ FAIL: ${config.host}:${config.port} | User: ${config.user} | Pass: ${config.password} | Error: ${err.message}`);
        return false;
    }
}

async function run() {
    for (const host of hosts) {
        for (const password of passwords) {
            const success = await tryConnect({ ...host, password });
            if (success) process.exit(0);
        }
    }
}

run();
