import dotenv from 'dotenv'
import path from 'path';
const env = process.env.NODE_ENV
const envPath = path.resolve(__dirname, `../.env.${env}`);
dotenv.config({ path: envPath })

import express from 'express'
import userRoutes from './routes/userRoutes'
import morgan from 'morgan';
import { createWriteStream } from 'fs';
import slowDown from 'express-slow-down';
import multer from 'multer';
import { requestLogger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';
import helmet from 'helmet';
import { expressjwt } from 'express-jwt';
import { API_PATHS, PUBLIC_PATHS } from './constants/apiPath';
import authRoutes from './routes/authRoutes';

const app = express()
const port = process.env.PORT

// 创建一个写入流（指向一个日志文件）
const accessLogStream = createWriteStream(
  path.join(__dirname, './logs/access.log'), // 文件路径
  { flags: 'a' } // 选项：'a' 表示追加，不会覆盖旧日志
);
const upload = multer({ dest: 'uploads/' })

app.use(requestLogger)
// HTTP 请求日志记录
app.use(morgan('combined', { stream: accessLogStream }))

// 使用helmet来设置安全头
app.use(helmet())

// 解析 application/json
app.use(express.json());
// 解析 application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// JWT 验证中间件
const authenticateJwt = expressjwt({
  secret: process.env.JWT_SECRET!,
  algorithms: ['HS256'],
  credentialsRequired: false // 允许未认证的请求访问某些路由
}).unless({
  path: PUBLIC_PATHS
});
app.use(authenticateJwt)
//对重复请求进行减速或限制速率，防止滥用
app.use(slowDown({
  windowMs: 15 * 60 * 1000, // 15分钟
  delayAfter: 100, // 前100个请求不延迟
  delayMs: () => 500 // 超过100个请求后，每秒延迟500ms
}))
app.use(API_PATHS.USERS.BASE, userRoutes)
app.use(API_PATHS.AUTH.BASE, authRoutes)
app.use(errorHandler)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
