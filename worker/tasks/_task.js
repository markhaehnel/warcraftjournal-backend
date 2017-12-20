class Task {
  /**
  * @param {object} channel - amqplib channel
  */
  constructor (channel) { this.channel = channel }

  start () {}
  stop () {}
}

module.exports = Task
