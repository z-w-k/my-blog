import dotenv from 'dotenv'
import path from 'path';
const env = process.env.NODE_ENV
const envPath = path.resolve(__dirname, `../.env.${env}`);
dotenv.config({path:envPath})

import express from 'express'
import userRoutes from './routes/userRoutes'

const app = express()
const port = 3000
app.get('/api',(req,res)=>{
  res.send('Hello World!')
})
app.use('/api/user', userRoutes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
