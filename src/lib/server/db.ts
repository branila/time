import { MONGO_URL } from '$env/static/private'
import { MongoClient } from 'mongodb'

const client = new MongoClient(MONGO_URL)
const users = client.db('time').collection('users')
const history = client.db('time').collection('history')
const events = client.db('time').collection('events')

export default async function databaseConnection() {
  try {
    await client.connect()
    await client.db("admin").command({ ping: 1 })
    console.log('Successfull database connection')
  } catch (err) {
    console.error('Database connection error: ', err)
  }
}

export { users, history, events }