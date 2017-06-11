import { Router } from 'express'

import guildRouter from './guilds'
import notFoundRouter from './not-found'

var router = Router()

router.use(guildRouter)
router.use(notFoundRouter)

export default router
