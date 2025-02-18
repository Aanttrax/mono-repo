import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../shared/guards/jwt.guard';
import { Request as RequestExpress } from 'express';

@Controller()
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/task')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getTasks(@Request() req: RequestExpress) {
    const userId = req.user as string;
    const tasks = await this.tasksService.getTasks(userId);
    return { success: true, response: tasks };
  }

  @Post('/task')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createTask(@Body() task: CreateTaskDto, @Request() req: RequestExpress) {
    const userId = req.user as string;
    await this.tasksService.createTask(task, userId);
    return { success: true, response: 'Task Created' };
  }

  @Get('/task/:taskId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getTaskById(@Param('taskId') taskId: string, @Request() req: RequestExpress) {
    const userId = req.user as string;
    const task = await this.tasksService.getTaskById(taskId, userId);
    if (!task) throw new NotFoundException('Task not found');
    return { success: true, response: task };
  }

  @Put('/task/:taskId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async updateTask(@Param('taskId') taskId: string, @Body() task: UpdateTaskDto, @Request() req: RequestExpress) {
    const userId = req.user as string;
    const isUpdatedTask = await this.tasksService.updateTask(taskId, task, userId);
    if (!isUpdatedTask) throw new NotFoundException('Task not found');
    return { success: true, response: 'Task Updated' };
  }

  @Delete('/task/:taskId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async deleteTask(@Param('taskId') taskId: string, @Request() req: RequestExpress) {
    const userId = req.user as string;
    const isDeletedTask = await this.tasksService.deleteTask(taskId, userId);
    if (!isDeletedTask) throw new NotFoundException('Task not found');
    return { success: true, response: 'Task Deleted' };
  }
}
