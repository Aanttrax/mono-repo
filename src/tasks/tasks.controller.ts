import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller()
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/task')
  @HttpCode(HttpStatus.OK)
  getTasks() {
    return this.tasksService.getTasks('asasa');
  }

  @Post('/task')
  @HttpCode(HttpStatus.CREATED)
  createTask(@Body() task: CreateTaskDto) {
    return this.tasksService.createTask(task, 'sfkjsfh');
  }

  @Get('/task/:taskId')
  @HttpCode(HttpStatus.OK)
  getTaskById(@Param('taskId') taskId: string) {
    return this.tasksService.getTaskById(taskId, 'asdfsaf');
  }

  @Put('/task/:taskId')
  @HttpCode(HttpStatus.OK)
  updateTask(@Param('taskId') taskId: string, @Body() task: UpdateTaskDto) {
    return this.tasksService.updateTask(taskId, task, 'kajshfs');
  }

  @Delete('/task/:taskId')
  @HttpCode(HttpStatus.OK)
  deleteTask(@Param('taskId') taskId: string) {
    return this.tasksService.deleteTask(taskId, 'asdfsa');
  }
}
