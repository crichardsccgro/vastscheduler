import { PowerShell } from 'node-powershell';
import { logger } from '../utils/logger.js';

export class PowerShellExecutor {
  async executeScript(scriptPath) {
    const ps = new PowerShell({
      debug: false,
      executableOptions: {
        '-ExecutionPolicy': 'Bypass',
        '-NoProfile': true
      }
    });

    try {
      await ps.addCommand(scriptPath);
      const result = await ps.invoke();
      return result;
    } catch (error) {
      logger.error('PowerShell execution error:', error);
      throw error;
    } finally {
      await ps.dispose();
    }
  }
}