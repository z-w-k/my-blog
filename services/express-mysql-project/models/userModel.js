const db = require('../config/database');

// 用户模型
const User = {
  // 获取所有用户
  getAll: async () => {
    try {
      const [rows] = await db.query('SELECT * FROM users');
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // 根据ID获取用户
  getById: async (id) => {
    try {
      const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  // 创建新用户
  create: async (userData) => {
    try {
      const { name, email, age } = userData;
      const [result] = await db.query(
        'INSERT INTO users (name, email, age) VALUES (?, ?, ?)',
        [name, email, age]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  },

  // 更新用户
  update: async (id, userData) => {
    try {
      const { name, email, age } = userData;
      const [result] = await db.query(
        'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?',
        [name, email, age, id]
      );
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  },

  // 删除用户
  delete: async (id) => {
    try {
      const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = User;