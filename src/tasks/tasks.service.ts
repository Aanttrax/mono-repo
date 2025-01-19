import { Injectable } from '@nestjs/common';
import { ITask } from './tasks.controller';

@Injectable()
export class TasksService {
  getTasks() {
    return 'All tasks';
  }

  createTask(task: ITask) {
    return task;
  }

  getTaskById(taskId: string) {
    console.log(taskId);
    return 'Task by ID';
  }

  updateTask(taskId: string) {
    console.log(taskId);
    return 'Task updated';
  }

  deleteTask(taskId: string) {
    console.log(taskId);
    return 'Task deleted';
  }
}
