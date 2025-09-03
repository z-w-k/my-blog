import { Request, Response } from 'express'
import Auth from '../models/authModel';

export const register = async (req: Request, res: Response) => {
  try{
    console.log('registerUser');
    
    const { username, email, password } = req.body
    const user = await Auth.register(username, email, password)
    res.json(user)
  }catch(error){
    res.status(500).json({message: '注册用户失败，请检查用户名是否已存在'})
  }
}
export const login = async (req: Request, res: Response) => {
  try{
    const { username, password } = req.body
    const user = await Auth.login(username, password)
    res.json(user)
  }catch(error){
    res.status(500).json({message: '登录失败'})
  }
}

export const resetPassword = async (req: Request, res: Response) => {
  try{
    const { username, password } = req.body
    const user = await Auth.resetPassword(username, password)
    res.json({message: '重置密码成功'})
  }catch(error){
    res.status(500).json({message: '重置密码失败'})
  }
}