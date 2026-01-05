class AsyncQueue {
  constructor() {
    this.queue = [];
    this.running = false;
  }

  add(job) {
    this.queue.push(job);
    this.process();
  }

  async process() {
    if (this.running) return;
    this.running = true;

    while (this.queue.length) {
      const job = this.queue.shift();
      try {
        await job();
      } catch (err) {
        console.error("Email job failed:", err.message);
      }
    }

    this.running = false;
  }
}

export const emailQueue = new AsyncQueue();
