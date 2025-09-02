// config/db.js
import mysql from 'mysql2';

// 创建连接池（推荐使用连接池提高性能）
const pool = mysql.createPool({
  host: process.env.DB_HOST,        // 数据库服务器地址
  user: process.env.DB_USER,    // 数据库用户名
  password: process.env.DB_PASSWORD,// 数据库密码
  database: process.env.DB_NAME,// 数据库名称
  waitForConnections: true,
  connectionLimit: 10,      // 连接池最大连接数:cite[1]:cite[3]
  queueLimit: 0
});

// 添加错误处理
pool.on('connection', (connection) => {
  console.log('New connection established');
});

pool.on('error', (err) => {
  console.error('Database error', err);
});

// 获取 Promise 版本的连接池
const promisePool = pool.promise();

console.log('数据库连接成功');

export default promisePool;