// 数据库配置模板
// 复制此文件为 db.config.js 并填入你的密码
module.exports = {
  host: 'localhost',
  user: 'root',
  password: 'YOUR_PASSWORD_HERE', // <--- 修改这里
  database: 'ordering_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};
