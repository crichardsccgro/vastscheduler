import { readFileSync } from 'fs';
import { logger } from '../utils/logger.js';

export function loadTasks() {
  try {
    const config = JSON.parse(readFileSync('tasks.json', 'utf8'));
    
    if (!config.tasks || !Array.isArray(config.tasks)) {
      logger.error('Invalid tasks configuration: tasks property must be an array');
      return [];
    }

    // Validate each task
    const validTasks = config.tasks.filter(task => {
      const isValid = task.name && task.schedule && task.script;
      if (!isValid) {
        logger.warn(`Skipping invalid task configuration: ${JSON.stringify(task)}`);
      }
      return isValid;
    });

    if (validTasks.length === 0) {
      logger.warn('No valid tasks found in configuration');
    }

    return validTasks;
  } catch (error) {
    if (error.code === 'ENOENT') {
      logger.error('tasks.json file not found');
    } else {
      logger.error('Failed to load tasks configuration:', error);
    }
    return [];
  }
}