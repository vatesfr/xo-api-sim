// Entry point for the mock server
import { startServer } from './server'

const port = parseInt(process.env.PORT || '3001', 10)

startServer(port).then(() => {
  console.log(`Mock XO API server running on port ${port}`)
}).catch(err => {
  console.error('Failed to start server:', err)
  process.exit(1)
})
