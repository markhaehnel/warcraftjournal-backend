/*
 * For testing purposes
 */

const amqplib = require('amqplib')

const QUEUE = 'TOKEN_UPDATE'

async function run () {
  let connection = await amqplib.connect('amqp://localhost')

  console.log('Connected')

  let channel = await connection.createChannel()

  console.log('Channel created')

  await channel.assertQueue(QUEUE)

  console.log('Queue asserted.')

  setInterval(async () => {
    console.log('Sending message to ', QUEUE)
    await channel.sendToQueue(QUEUE, Buffer.from(Math.random().toString()))
  }, 10000)
}

run()
