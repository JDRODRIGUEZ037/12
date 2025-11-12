// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ExcelJS = require('exceljs');
const connectDB = require('./config/db');

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000', credentials: true }));

let db; // pool MySQL

const JWT_SECRET = process.env.JWT_SECRET || 'insecure-development-secret';
const ENCRYPTION_SECRET = process.env.ENCRYPTION_KEY || 'change-me-in-production';
const ENCRYPTION_KEY = crypto.createHash('sha256').update(String(ENCRYPTION_SECRET)).digest();

function encryptText(text) {
  if (text === null || text === undefined) return null;
  if (text === '') return '';
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-ctr', ENCRYPTION_KEY, iv);
  const encrypted = Buffer.concat([cipher.update(String(text), 'utf8'), cipher.final()]);
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

function decryptText(value) {
  if (value === null || value === undefined) return null;
  if (typeof value !== 'string') return value;
  if (!value.includes(':')) return value;
  const [ivHex, encryptedHex] = value.split(':');
  if (!ivHex || !encryptedHex) return value;
  try {
    const iv = Buffer.from(ivHex, 'hex');
    const encrypted = Buffer.from(encryptedHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-ctr', ENCRYPTION_KEY, iv);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString('utf8');
  } catch (error) {
    console.warn('No se pudo desencriptar el valor, se devolverá original. Razón:', error.message);
    return value;
  }
}

function mapPublicationRow(row) {
  return {
    publication_id: row.publication_id,
    content: decryptText(row.content),
    image_url: decryptText(row.image_url),
    total_likes: row.total_likes,
    total_comments: row.total_comments,
    total_shares: row.total_shares,
    created_at: row.created_at,
  };
}

function authenticate(requiredPermissions = []) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;
    if (!token) {
      return res.status(401).json({ message: 'No autorizado. Inicia sesión nuevamente.' });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido o expirado. Inicia sesión de nuevo.' });
    }

    const missing = requiredPermissions.filter((permission) => !req.user?.permissions?.[permission]);
    if (missing.length > 0) {
      return res.status(403).json({ message: 'No cuentas con permisos para realizar esta acción.', missing });
    }

    next();
  };
}

async function getUserWithPermissions(username) {
  if (!db) throw new Error('La base de datos no está lista');
  try {
    const [rows] = await db.execute(
      `SELECT user_id, username, role,
              COALESCE(password_hash, password) AS password_hash,
              COALESCE(can_create, role = 'admin') AS can_create,
              COALESCE(can_update, role = 'admin') AS can_update,
              COALESCE(can_delete, role = 'admin') AS can_delete,
              COALESCE(can_export, role = 'admin') AS can_export,
              COALESCE(can_manage_triggers, role = 'admin') AS can_manage_triggers
       FROM users
       WHERE username = ?
       LIMIT 1`,
      [username]
    );

    if (!rows.length) return null;
    const row = rows[0];
    return {
      id: row.user_id,
      username: row.username,
      role: row.role || 'user',
      passwordHash: row.password_hash,
      permissions: {
        canCreate: Boolean(row.can_create),
        canUpdate: Boolean(row.can_update),
        canDelete: Boolean(row.can_delete),
        canExport: Boolean(row.can_export),
        canManageTriggers: Boolean(row.can_manage_triggers),
      },
    };
  } catch (error) {
    if (error.code === 'ER_BAD_FIELD_ERROR') {
      const [rows] = await db.execute(
        `SELECT user_id, username, role, COALESCE(password_hash, password) AS password_hash
         FROM users
         WHERE username = ?
         LIMIT 1`,
        [username]
      );
      if (!rows.length) return null;
      const row = rows[0];
      const isAdmin = String(row.role || '').toLowerCase() === 'admin';
      return {
        id: row.user_id,
        username: row.username,
        role: row.role || 'user',
        passwordHash: row.password_hash,
        permissions: {
          canCreate: isAdmin,
          canUpdate: isAdmin,
          canDelete: isAdmin,
          canExport: isAdmin,
          canManageTriggers: isAdmin,
        },
      };
    }
    throw error;
  }
}

async function verifyPassword(password, storedHash) {
  if (!storedHash) return false;
  if (storedHash.startsWith('$2a$') || storedHash.startsWith('$2b$')) {
    return bcrypt.compare(password, storedHash);
  }
  return storedHash === password;
}

// Health check
app.get('/health', async (_req, res) => {
  try {
    if (!db) throw new Error('db not ready');
    await db.query('SELECT 1');
    return res.json({ ok: true, db: 'ok' });
  } catch (e) {
    return res.status(200).json({ ok: true, db: 'error', msg: e.message });
  }
});

// Home
app.get('/', (_req, res) => {
  res.send('API de Marketplace está corriendo.');
});

// Autenticación
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ message: 'Debes proporcionar usuario y contraseña.' });
  }

  try {
    const user = await getUserWithPermissions(username);
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    const isValidPassword = await verifyPassword(password, user.passwordHash);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    const safeUser = {
      id: user.id,
      username: user.username,
      role: user.role,
      permissions: user.permissions,
    };

    const token = jwt.sign(safeUser, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: safeUser });
  } catch (error) {
    console.error('Error durante el login:', error);
    res.status(500).json({ message: 'Error interno al iniciar sesión.' });
  }
});

app.get('/api/auth/profile', authenticate(), (req, res) => {
  res.json({ user: req.user });
});

// Productos (usa tu tabla real)
app.get('/api/products', authenticate(), async (_req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM products LIMIT 100');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener productos:', error.message);
    res.status(500).json({ message: 'Error interno del servidor al obtener productos.' });
  }
});

function buildPublicationFilters(query) {
  const sqlParts = [];
  const params = [];

  if (query.startDate) {
    sqlParts.push('created_at >= ?');
    params.push(query.startDate);
  }
  if (query.endDate) {
    sqlParts.push('created_at <= ?');
    params.push(query.endDate);
  }
  if (query.minLikes) {
    sqlParts.push('total_likes >= ?');
    params.push(Number(query.minLikes));
  }
  if (query.maxLikes) {
    sqlParts.push('total_likes <= ?');
    params.push(Number(query.maxLikes));
  }
  return { sqlParts, params };
}

app.get('/api/publications', authenticate(), async (req, res) => {
  try {
    const { sqlParts, params } = buildPublicationFilters(req.query);
    let baseQuery =
      'SELECT publication_id, content, image_url, total_likes, total_comments, total_shares, created_at FROM publications';
    if (sqlParts.length > 0) {
      baseQuery += ` WHERE ${sqlParts.join(' AND ')}`;
    }
    baseQuery += ' ORDER BY created_at DESC';

    const [rows] = await db.execute(baseQuery, params);
    let publications = rows.map(mapPublicationRow);

    if (req.query.search) {
      const term = req.query.search.toLowerCase();
      publications = publications.filter((publication) =>
        (publication.content || '').toLowerCase().includes(term)
      );
    }

    res.json(publications);
  } catch (error) {
    console.error('Error al obtener publicaciones:', error.message);
    res.status(500).json({ message: 'Error interno del servidor al obtener publicaciones.' });
  }
});

app.get('/api/publications/:id', authenticate(), async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.execute(
      'SELECT publication_id, content, image_url, total_likes, total_comments, total_shares, created_at FROM publications WHERE publication_id = ? LIMIT 1',
      [id]
    );
    if (!rows.length) {
      return res.status(404).json({ message: 'Publicación no encontrada.' });
    }
    res.json(mapPublicationRow(rows[0]));
  } catch (error) {
    console.error('Error al obtener la publicación:', error.message);
    res.status(500).json({ message: 'Error interno del servidor al obtener la publicación.' });
  }
});

app.post('/api/publications', authenticate(['canCreate']), async (req, res) => {
  const { content, imageUrl, totalLikes = 0, totalComments = 0, totalShares = 0 } = req.body || {};
  if (!content) {
    return res.status(400).json({ message: 'El contenido es obligatorio.' });
  }

  try {
    const encryptedContent = encryptText(content);
    const encryptedImage = imageUrl ? encryptText(imageUrl) : null;
    const [result] = await db.execute(
      `INSERT INTO publications (content, image_url, total_likes, total_comments, total_shares)
       VALUES (?, ?, ?, ?, ?)`,
      [encryptedContent, encryptedImage, Number(totalLikes), Number(totalComments), Number(totalShares)]
    );

    const [rows] = await db.execute(
      'SELECT publication_id, content, image_url, total_likes, total_comments, total_shares, created_at FROM publications WHERE publication_id = ? LIMIT 1',
      [result.insertId]
    );

    res.status(201).json(mapPublicationRow(rows[0]));
  } catch (error) {
    console.error('Error al crear la publicación:', error.message);
    res.status(500).json({ message: 'Error interno del servidor al crear la publicación.' });
  }
});

app.put('/api/publications/:id', authenticate(['canUpdate']), async (req, res) => {
  const { id } = req.params;
  const { content, imageUrl, totalLikes = 0, totalComments = 0, totalShares = 0 } = req.body || {};
  if (!content) {
    return res.status(400).json({ message: 'El contenido es obligatorio.' });
  }

  try {
    const encryptedContent = encryptText(content);
    const encryptedImage = imageUrl ? encryptText(imageUrl) : null;
    const [result] = await db.execute(
      `UPDATE publications
       SET content = ?, image_url = ?, total_likes = ?, total_comments = ?, total_shares = ?
       WHERE publication_id = ?`,
      [encryptedContent, encryptedImage, Number(totalLikes), Number(totalComments), Number(totalShares), id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Publicación no encontrada.' });
    }

    const [rows] = await db.execute(
      'SELECT publication_id, content, image_url, total_likes, total_comments, total_shares, created_at FROM publications WHERE publication_id = ? LIMIT 1',
      [id]
    );

    res.json(mapPublicationRow(rows[0]));
  } catch (error) {
    console.error('Error al actualizar la publicación:', error.message);
    res.status(500).json({ message: 'Error interno del servidor al actualizar la publicación.' });
  }
});

app.delete('/api/publications/:id', authenticate(['canDelete']), async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute('DELETE FROM publications WHERE publication_id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Publicación no encontrada.' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar la publicación:', error.message);
    res.status(500).json({ message: 'Error interno del servidor al eliminar la publicación.' });
  }
});

app.get('/api/publications/export', authenticate(['canExport']), async (req, res) => {
  try {
    const { sqlParts, params } = buildPublicationFilters(req.query);
    let baseQuery =
      'SELECT publication_id, content, image_url, total_likes, total_comments, total_shares, created_at FROM publications';
    if (sqlParts.length > 0) {
      baseQuery += ` WHERE ${sqlParts.join(' AND ')}`;
    }
    baseQuery += ' ORDER BY created_at DESC';

    const [rows] = await db.execute(baseQuery, params);
    let publications = rows.map(mapPublicationRow);
    if (req.query.search) {
      const term = req.query.search.toLowerCase();
      publications = publications.filter((publication) =>
        (publication.content || '').toLowerCase().includes(term)
      );
    }

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Publicaciones');
    sheet.columns = [
      { header: 'ID', key: 'publication_id', width: 10 },
      { header: 'Contenido', key: 'content', width: 60 },
      { header: 'Imagen', key: 'image_url', width: 40 },
      { header: 'Likes', key: 'total_likes', width: 10 },
      { header: 'Comentarios', key: 'total_comments', width: 15 },
      { header: 'Compartidos', key: 'total_shares', width: 15 },
      { header: 'Creado', key: 'created_at', width: 25 },
    ];

    publications.forEach((publication) => {
      sheet.addRow(publication);
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename="publicaciones.xlsx"');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Error al exportar publicaciones:', error.message);
    res.status(500).json({ message: 'Error interno del servidor al exportar publicaciones.' });
  }
});

app.post(
  '/api/triggers/publication-log',
  authenticate(['canManageTriggers']),
  async (_req, res) => {
    try {
      await db.execute(`
        CREATE TABLE IF NOT EXISTS publication_logs (
          log_id INT AUTO_INCREMENT PRIMARY KEY,
          publication_id INT NOT NULL,
          action VARCHAR(50) NOT NULL,
          executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB
      `);
      await db.execute('DROP TRIGGER IF EXISTS trg_publications_after_insert');
      await db.execute(`
        CREATE TRIGGER trg_publications_after_insert
        AFTER INSERT ON publications
        FOR EACH ROW
        INSERT INTO publication_logs (publication_id, action)
        VALUES (NEW.publication_id, 'INSERT')
      `);
      res.json({ message: 'Trigger configurado correctamente.' });
    } catch (error) {
      console.error('Error al configurar el trigger:', error.message);
      res.status(500).json({ message: 'Error interno del servidor al configurar el trigger.' });
    }
  }
);

const PORT = Number(process.env.PORT || 5000);
(async () => {
  try {
    db = await connectDB();
    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
  } catch (e) {
    console.error('Fallo crítico al iniciar el servidor:', e.message);
    process.exit(1);
  }
})();
