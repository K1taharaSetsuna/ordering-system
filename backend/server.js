const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

// 尝试加载配置文件，如果不存在则提示
let dbConfig;
try {
  dbConfig = require('./db.config');
} catch (e) {
  console.error('❌ 错误：未找到 backend/db.config.js 配置文件');
  console.error('👉 请复制 backend/db.config.example.js 为 backend/db.config.js 并配置密码');
  process.exit(1);
}

const app = express();
const PORT = 3000;

// 中间件配置
app.use(cors()); // 允许跨域
app.use(express.json()); // 解析 JSON 请求体
app.use(express.urlencoded({ extended: true }));

// 数据库连接池配置
const db = mysql.createPool(dbConfig);

// 测试数据库连接
(async () => {
  try {
    const connection = await db.getConnection();
    console.log('✅ 数据库连接成功！');
    connection.release();
  } catch (err) {
    console.error('❌ 数据库连接失败:', err.message);
    if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('   -> 请检查 server.js 中的 password 是否正确');
    } else if (err.code === 'ER_BAD_DB_ERROR') {
      console.error('   -> 请检查是否已创建 ordering_db 数据库');
    }
  }
})();

// 路由挂载
app.get('/', (req, res) => {
  res.send('点餐系统 API 服务已启动');
});

// 测试接口：获取所有菜品
app.get('/api/dishes', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM dishes');
    res.json({ code: 0, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ code: -1, msg: '服务器错误' });
  }
});

// 启动服务
app.listen(PORT, () => {
  console.log(`✅ 服务器已启动: http://localhost:${PORT}`);
  console.log(`   接口地址: http://localhost:${PORT}/api/dishes`);
});
