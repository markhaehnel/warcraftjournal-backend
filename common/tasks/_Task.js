const CONCURRENCY = 1
const TTL = 30000

const appStore = require('common/stores/application')

class Task {
  constructor (queue, task) {
    this.queue = queue
    this.task = task
  }

  listen () {
    appStore.logger.info(`Listening for task ${this.task}`)
    this.queue.process(this.task, CONCURRENCY, (job, done) => {
      appStore.logger.info(`Received task ${this.task}`)
      this.run(job, done)
    })
  }

  enqueue () {
    appStore.logger.info(`Queueing task ${this.task}`)
    this.queue.create(this.task).ttl(TTL).removeOnComplete(true).save()
  }

  run (job, done) {}
}

module.exports = Task
