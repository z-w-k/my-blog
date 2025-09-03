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

