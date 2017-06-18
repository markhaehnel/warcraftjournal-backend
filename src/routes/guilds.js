const Router = require('express').Router
const HttpStatus = require('http-status-codes')
const mongoose = require('mongoose')
const blizzard = require('../config/blizzard')

const router = Router()

router.get('/guilds', async (req, res, next) => {
    res.status(HttpStatus.NOT_IMPLEMENTED).json({ 'message': 'Not implemented yet' })
})

router.get('/guilds/:realm/:name', async (req, res, next) => {
    let Guild = mongoose.model('Guild')
    let guild = await Guild.findOne({ realm: req.params.realm, name: req.params.name })

    if (!guild) {
        try {
            let data = (await blizzard.wow.guild(['members'], { origin: 'eu', realm: req.params.realm, name: req.params.name })).data

            let members = []

            data.members.forEach((rawMember) => {
                members.push({
                    name: rawMember.character.name,
                    realm: rawMember.character.realm
                })
            })

            guild = new Guild({
                name: data.name,
                realm: data.realm,
                side: data.side,
                members: members
            })

            await guild.save()

            res.status(HttpStatus.OK).json(guild)
        } catch (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 'message': err.message })
        }
    }
})

module.exports = router
