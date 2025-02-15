import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from 'src/tasks/schemas/task.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async getTasks(userId: string) {
    return await this.taskModel
      .find({ userId: new Types.ObjectId(userId) }, { createdAt: 0, updatedAt: 0 })
      .sort({ done: -1 })
      .lean()
      .exec();
  }

  async createTask(task: CreateTaskDto, userId: string) {
    const newTask = new this.taskModel({ ...task, userId: new Types.ObjectId(userId) });
    await newTask.save();
    return;
  }

  async getTaskById(taskId: string, userId: string) {
    return await this.taskModel
      .findOne({ _id: new Types.ObjectId(taskId), userId: new Types.ObjectId(userId) }, { createdAt: 0, updatedAt: 0 })
      .lean()
      .exec();
  }

  async updateTask(taskId: string, task: UpdateTaskDto, userId: string) {
    return await this.taskModel
      .findOneAndUpdate({ _id: new Types.ObjectId(taskId), userId: new Types.ObjectId(userId) }, task)
      .lean()
      .exec();
  }

  async deleteTask(taskId: string, userId: string) {
    return await this.taskModel
      .findOneAndDelete({ _id: new Types.ObjectId(taskId), userId: new Types.ObjectId(userId) })
      .lean()
      .exec();
  }
}
