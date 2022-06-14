import 'reflect-metadata'
import TypeOrmDatabase from './data'
import app from './app'

TypeOrmDatabase.connect()
  .then(() => {
    console.log('Connected with the database')
    app.init()
  })
  .catch(err => { console.log('❌ Failed to connect with the database', err) })