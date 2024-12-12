import { TaskScheduler } from './scheduler/taskScheduler.js';
import { PowerShellExecutor } from './powershell/powerShellExecutor.js';
import { logger } from './utils/logger.js';
import { loadTasks } from './config/taskLoader.js';

async function main() {
  try {
    logger.info('Starting PowerShell Task Scheduler');
    
    const executor = new PowerShellExecutor();
    const scheduler = new TaskScheduler(executor);
    
    // Load tasks from configuration
    const tasks = loadTasks();
    
    if (tasks.length === 0) {
      logger.warn('No tasks to schedule. Please check your tasks.json configuration.');
      return;
    }

    // Schedule all tasks
    for (const task of tasks) {
      try {
        scheduler.scheduleTask(task);
        logger.info(`Scheduled task: ${task.name}`);
      } catch (error) {
        logger.error(`Failed to schedule task ${task.name}:`, error);
      }
    }
    
    logger.info(`Successfully scheduled ${tasks.length} tasks`);
    logger.info('Scheduler is running. Press Ctrl+C to exit.');

    // Handle graceful shutdown
    process.on('SIGINT', () => {
      logger.info('Shutting down scheduler...');
      scheduler.cancelAllTasks();
      process.exit(0);
    });
  } catch (error) {
    logger.error('Failed to start scheduler:', error);
    process.exit(1);
  }
}