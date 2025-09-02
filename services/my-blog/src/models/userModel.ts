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
  register: async (username: string, email: string, password: string) => {
    try{
      const [rows, fields] = await promisePool.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password])
      return rows
    }catch(error){
      throw error
    }
  },
  login: async (username: string, password: string) => {
    try{
      const [rows, fields] = await promisePool.execute('SELECT * FROM users WHERE username = ? AND password = ?', [username, password])
      return rows
    }catch(error){
      throw error
    }
  },
  resetPassword: async (username: string, password: string) => {
    try{
      const [rows, fields] = await promisePool.execute('UPDATE users SET password = ? WHERE username = ?', [password, username])
      return rows
    }catch(error){
      throw error
    }
  }
}

export default User