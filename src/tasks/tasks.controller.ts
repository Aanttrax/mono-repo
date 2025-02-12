import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller()
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/task')
  getTasks() {
    return this.tasksService.getTasks('asasa');
  }

  @Post('/task')
  @HttpCode(201)
  createTask(@Body() task: CreateTaskDto) {
    return this.tasksService.createTask(task, 'sfkjsfh');
  }

  @Get('/task/:taskId')
  getTaskById(@Param('taskId') taskId: string) {
    return this.tasksService.getTaskById(taskId, 'asdfsaf');
  }

  @Put('/task/:taskId')
  updateTask(@Param('taskId') taskId: string, @Body() task: UpdateTaskDto) {
    return this.tasksService.updateTask(taskId, task, 'kajshfs');
  }

  @Delete('/task/:taskId')
  deleteTask(@Param('taskId') taskId: string) {
    return this.tasksService.deleteTask(taskId, 'asdfsa');
  }
}
