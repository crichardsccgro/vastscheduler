# PowerShell Task Scheduler

A Node.js application for scheduling and executing PowerShell scripts with a clean, modular architecture.

## Features

- Schedule PowerShell scripts using cron-style expressions
- Configurable tasks via JSON
- Detailed logging system
- Error handling and recovery
- Modular and maintainable codebase

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure your tasks in `tasks.json`
   - Each task needs a name, schedule (cron expression), and script path
   - Example cron expressions:
     - "0 0 * * *" (daily at midnight)
     - "*/15 * * * *" (every 15 minutes)
     - "0 */4 * * *" (every 4 hours)

3. Start the scheduler:
   ```bash
   npm start
   ```

## Task Configuration

Edit `tasks.json` to manage your scheduled tasks. Example format:

```json
{
  "tasks": [
    {
      "name": "Task Name",
      "schedule": "cron expression",
      "script": "path/to/script.ps1",
      "description": "Task description"
    }
  ]
}
```

## Logging

Logs are stored in the `logs` directory:
- `combined.log`: All logs
- `error.log`: Error logs only

Console output is also available during runtime.