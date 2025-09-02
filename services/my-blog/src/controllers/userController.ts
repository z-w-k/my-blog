import User from '../models/userModel'
import { Request, Response } from 'express'

export const getAllUsers = async (req: Request, res: Response) => {
  try{
    const users = await User.getAll()
    res.json(users)
  }catch(error){
    res.status(500).json({message: '获取用户失败'})
  }
}

export const registerUser = async (req: Request, res: Response) => {
  try{
    console.log('registerUser');
    
    const { username, email, password } = req.body
    const user = await User.register(username, email, password)
    res.json(user)
  }catch(error){
    res.status(500).json({message: '注册用户失败'})
  }
}
export const loginUser = async (req: Request, res: Response) => {
  try{
    const { username, password } = req.body
    const user = await User.login(username, password)
    res.json(user)
  }catch(error){
    res.status(500).json({message: '登录失败'})
  }
}

export const resetPassword = async (req: Request, res: Response) => {
  try{
    const { username, password } = req.body
    const user = await User.resetPassword(username, password)
    res.json(user)
  }catch(error){
    res.status(500).json({message: '重置密码失败'})
  }
}

