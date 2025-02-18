import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { NotFoundException } from '@nestjs/common';
import { Request } from 'express';

describe('TasksController', () => {
  let controller: TasksController;
  let tasksService: TasksService;

  const mockTask = {
    _id: '65b9e0d5f1b2c3a6d8e7f9b0',
    title: 'Test Task',
    description: 'Test Description',
    userId: 'user123',
  };

  const mockTasksService = {
    getTasks: jest.fn().mockResolvedValue([mockTask]),
    createTask: jest.fn().mockResolvedValue(undefined),
    getTaskById: jest.fn().mockResolvedValue(mockTask),
    updateTask: jest.fn().mockResolvedValue(true),
    deleteTask: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [{ provide: TasksService, useValue: mockTasksService }],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    tasksService = module.get<TasksService>(TasksService);
  });

  it('Debe obtener todas las tareas', async () => {
    const req: Partial<Request> = { user: 'user123' };
    const result = await controller.getTasks(req as Request);
    expect(result).toEqual({ success: true, response: [mockTask] });
    expect(tasksService.getTasks).toHaveBeenCalledWith('user123');
  });

  it('Debe crear una tarea', async () => {
    const req: Partial<Request> = { user: 'user123' };
    const taskDto: CreateTaskDto = { title: 'New Task', description: 'New Desc' };
    const result = await controller.createTask(taskDto, req as Request);
    expect(result).toEqual({ success: true, response: 'Task Created' });
    expect(tasksService.createTask).toHaveBeenCalledWith(taskDto, 'user123');
  });

  it('Debe obtener una tarea por ID', async () => {
    const req: Partial<Request> = { user: 'user123' };
    const result = await controller.getTaskById(mockTask._id, req as Request);
    expect(result).toEqual({ success: true, response: mockTask });
    expect(tasksService.getTaskById).toHaveBeenCalledWith(mockTask._id, 'user123');
  });

  it('Debe lanzar `NotFoundException` si la tarea no existe', async () => {
    const req: Partial<Request> = { user: 'user123' };
    jest.spyOn(tasksService, 'getTaskById').mockResolvedValueOnce(null);
    await expect(controller.getTaskById(mockTask._id, req as Request)).rejects.toThrow(NotFoundException);
  });

  it('Debe actualizar una tarea', async () => {
    const req: Partial<Request> = { user: 'user123' };
    const updateDto: UpdateTaskDto = { title: 'Updated Task' };
    const result = await controller.updateTask(mockTask._id, updateDto, req as Request);
    expect(result).toEqual({ success: true, response: 'Task Updated' });
    expect(tasksService.updateTask).toHaveBeenCalledWith(mockTask._id, updateDto, 'user123');
  });

  it('Debe lanzar `NotFoundException` si la actualización falla', async () => {
    const req: Partial<Request> = { user: 'user123' };
    jest.spyOn(tasksService, 'updateTask').mockResolvedValueOnce(null);
    await expect(controller.updateTask(mockTask._id, {}, req as Request)).rejects.toThrow(NotFoundException);
  });

  it('Debe eliminar una tarea', async () => {
    const req: Partial<Request> = { user: 'user123' };
    const result = await controller.deleteTask(mockTask._id, req as Request);
    expect(result).toEqual({ success: true, response: 'Task Deleted' });
    expect(tasksService.deleteTask).toHaveBeenCalledWith(mockTask._id, 'user123');
  });

  it('Debe lanzar `NotFoundException` si la eliminación falla', async () => {
    const req: Partial<Request> = { user: 'user123' };
    jest.spyOn(tasksService, 'deleteTask').mockResolvedValueOnce(null);
    await expect(controller.deleteTask(mockTask._id, req as Request)).rejects.toThrow(NotFoundException);
  });
});
