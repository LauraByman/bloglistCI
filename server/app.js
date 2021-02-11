const config = require('./utils/config')
const express = require('express')
require('express-async-errors') //no need to write try catch with async/await
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const healthRouter = require('./controllers/health')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
var path = require('path')




mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
// const STATIC_ASSETS_PATH = path.resolve(`${__dirname}/../static`);
// app.use("/static", express.static(STATIC_ASSETS_PATH));
// app.use(express.static(path.join(__dirname, '/../client/build')));
app.use(express.json())
app.use(middleware.requestLogger)

// app.use(express.static('./public/'))

// app.get('*', function(req, res) {
//   res.sendFile(path.resolve(__dirname, '../public/index.html'))
// })

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testRouter')
  app.use('/api/testing', testingRouter)
}

app.use('/api/login', loginRouter)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/health', healthRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app
