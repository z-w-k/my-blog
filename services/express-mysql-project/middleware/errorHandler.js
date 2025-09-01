// 错误处理中间件
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  // MySQL错误处理
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(400).json({
      success: false,
      message: '邮箱已存在'
    });
  }
  
  // 默认错误处理
  res.status(500).json({
    success: false,
    message: '服务器内部错误',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
};

module.exports = errorHandler;