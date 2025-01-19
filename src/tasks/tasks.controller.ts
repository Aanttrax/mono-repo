import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';

export interface ITask {
  title: string;
  description: string;
  done: boolean;
}
@Controller()
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/task')
  getTasks() {
    return this.tasksService.getTasks();
  }

  @Post('/task')
  createTask(@Body() task: ITask) {
    return this.tasksService.createTask(task);
  }

  @Get('/task/:taskId')
  getTaskById(@Param('taskId') taskId: string) {
    return this.tasksService.getTaskById(taskId);
  }

  @Put('/task/:taskId')
  updateTask(@Param('taskId') taskId: string) {
    return this.tasksService.updateTask(taskId);
  }

  @Delete('/task/:taskId')
  deleteTask(@Param('taskId') taskId: string) {
    return this.tasksService.deleteTask(taskId);
  }
}
