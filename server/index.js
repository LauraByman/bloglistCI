const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

// eslint-disable-next-line no-unused-vars
const server = http.createServer(app)
const port = process.env.PORT ? process.env.PORT : 3000;

app.listen(port, () => {
  logger.info(`Server running on port ${port}`)
})
