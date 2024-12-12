import schedule from 'node-schedule';
import { logger } from '../utils/logger.js';

export class TaskScheduler {
  constructor(executor) {
    this.executor = executor;
    this.jobs = new Map();
  }

  scheduleTask(task) {
    if (!task.name || !task.schedule || !task.script) {
      throw new Error(`Invalid task configuration: ${JSON.stringify(task)}`);
    }

    try {
      const job = schedule.scheduleJob(task.schedule, async () => {
        logger.info(`Executing task: ${task.name}`);
        try {
          await this.executor.executeScript(task.script);
          logger.info(`Task completed successfully: ${task.name}`);
        } catch (error) {
          logger.error(`Task failed: ${task.name}`, error);
        }
      });

      if (!job) {
        throw new Error(`Invalid schedule pattern: ${task.schedule}`);
      }

      this.jobs.set(task.name, job);
      logger.info(`Task scheduled: ${task.name} with schedule: ${task.schedule}`);
    } catch (error) {
      logger.error(`Failed to schedule task: ${task.name}`, error);
      throw error;
    }
  }

  cancelTask(taskName) {
    const job = this.jobs.get(taskName);
    if (job) {
      job.cancel();
      this.jobs.delete(taskName);
      logger.info(`Task cancelled: ${taskName}`);
    }
  }

  cancelAllTasks() {
    for (const [taskName, job] of this.jobs) {
      job.cancel();
      logger.info(`Task cancelled: ${taskName}`);
    }
    this.jobs.clear();
    logger.info('All tasks cancelled');
  }
}