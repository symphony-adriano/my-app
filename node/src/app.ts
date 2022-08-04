import express from 'express'
import cors from 'cors'

import wizardRoutes from './wizards/wizardRoutes'

const app = express()

app.use([
    express.json(),
    cors(),
])

app.use('/wizards', wizardRoutes)

export default app
