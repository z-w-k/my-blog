import express from 'express'
import promisePool from '../config/db'
const router = express.Router()

router.get('/users', async (req, res) => {
  try{
    const [rows,fields] = await promisePool.execute('SELECT userId,username,email FROM users')
    console.log(rows,fields)
    res.json({rows})
  }catch(error){
    console.error('数据库查询错误:', error);
    res.status(500).send('服务器内部错误');
  }
})
export default router