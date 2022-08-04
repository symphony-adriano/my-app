import express from 'express'
import { wizardList } from './wizardController'

const router = express.Router()

router.get('/', wizardList)

export default router
