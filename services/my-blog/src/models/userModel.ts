import promisePool from '../config/db'

const User =  {
  getAll: async () => {
    try{
      const [rows, fields] = await promisePool.execute('SELECT * FROM users')
      return rows
    }catch(error){
      throw error
    }
  },
  getByUsername: async (username: string) => {
    try{
      const [rows, fields] = await promisePool.execute('SELECT * FROM users WHERE username = ?', [username])
      return rows
    }catch(error){
      throw error
    }
  }
}

export default User