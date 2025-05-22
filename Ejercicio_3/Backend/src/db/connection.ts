import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: 'localhost',
  port:8080,
  user: 'jasboot',
  password: 'P0pok@tepel01',
  database: 'inventario',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0, 
});
