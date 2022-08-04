import http from 'http'

import app from './app'

const PORT = 4000

const httpServer = http.createServer(app)

httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

