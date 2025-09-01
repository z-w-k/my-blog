import express from 'express'
import promisePool from './config/db'
import userRoutes from './routes/user'

const app = express()
const port = 3000
app.get('/api',(req,res)=>{
  res.send('Hello World!')
})
app.use('/api/user', userRoutes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
