import { MONGO_URL } from '$env/static/private'
import { MongoClient } from 'mongodb'

const client = new MongoClient(MONGO_URL)
const users = client.db('time').collection('users')
const history = client.db('time').collection('history')
const events = client.db('time').collection('events')

export default async function connect() {
  try {
    await client.connect()
    console.log('Successfull database connection')
  } catch (err) {
    console.error('Database connection error: ', err)
  }
}

export { users, history, events }