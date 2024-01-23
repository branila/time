import { MONGO_URL } from '$env/static/private'
import { MongoClient } from 'mongodb'

class Database {
  static client = new MongoClient(MONGO_URL)
  static users = this.client.db('time').collection('users')
  static history = this.client.db('time').collection('history')
  static events = this.client.db('time').collection('events')

  static async connect() {
    try {
      await this.client.connect()
      console.log('Successfull database connection')
    } catch (err) {
      console.error('Database connection error: ', err)
    }
  }
}

export default Database