import { NextFunction, Request, Response } from "express";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // 打印错误堆栈到服务器控制台
  res.status(500).send('服务器内部错误！'); // 向客户端发送通用的错误信息
};