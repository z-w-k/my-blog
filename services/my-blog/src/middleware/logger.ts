import { NextFunction, Request, Response } from "express";

// 一个简单的日志记录中间件
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`请求方法: ${req.method}, 请求路径: ${req.url}, 请求时间: ${new Date().toISOString()}`);
  next(); // 切记调用 next()
};
