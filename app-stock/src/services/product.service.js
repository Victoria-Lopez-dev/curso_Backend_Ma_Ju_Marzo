const pool = require('../config/db.mysql');

exports.getAll = async () => {
  const [rows] = await pool.query(`
    SELECT 
      p.id, 
      p.name, 
      p.price, 
      p.quantity, 
      p.category_id, 
      c.name AS category_name
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
  `);
  return rows;
};

exports.getById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT 
      p.id, 
      p.name, 
      p.price, 
      p.quantity, 
      p.category_id, 
      c.name AS category_name
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.id = ?
  `,
    [id]
  );
  return rows[0];
};
exports.create = async ({ name, price, quantity, category_id }) => {
  const [result] = await pool.query(
    'INSERT INTO products (name, price, quantity, category_id) VALUES (?, ?, ?, ?)',
    [name, price, quantity, category_id]
  );
  return { id: result.insertId, name, price, quantity, category_id };
};

exports.update = async (id, { name, price, quantity, category_id }) => {
  await pool.query(
    'UPDATE products SET name = ?, price = ?, quantity = ?, category_id = ? WHERE id = ?',
    [name, price, quantity, category_id, id]
  );
  return { id, name, price, quantity, category_id };
};

exports.remove = async (id) => {
  await pool.query('DELETE FROM products WHERE id = ?', [id]);
  return { deleted: true };
};
