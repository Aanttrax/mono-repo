import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  getTasks() {
    return 'All tasks';
  }

  createTask(task: CreateTaskDto) {
    return task;
  }

  getTaskById(taskId: string) {
    console.log(taskId);
    return 'Task by ID';
  }

  updateTask(taskId: string, task: UpdateTaskDto) {
    console.log(taskId, task);
    return 'Task updated';
  }

  deleteTask(taskId: string) {
    console.log(taskId);
    return 'Task deleted';
  }
}
