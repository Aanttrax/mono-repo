import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task } from '../tasks/schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

const mockTask = {
  _id: new Types.ObjectId(),
  title: 'Test Task',
  description: 'Task description',
  done: false,
  userId: new Types.ObjectId(),
};

const mockTaskModel = {
  find: jest.fn().mockReturnValue({
    sort: jest.fn().mockReturnValue({
      lean: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue([mockTask]),
      }),
    }),
  }),
  findOne: jest.fn().mockReturnValue({
    lean: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockTask),
    }),
  }),
  create: jest.fn().mockResolvedValue(undefined),
  findOneAndUpdate: jest.fn().mockReturnValue({
    lean: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockTask),
    }),
  }),
  findOneAndDelete: jest.fn().mockReturnValue({
    lean: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockTask),
    }),
  }),
};

describe('TasksService', () => {
  let service: TasksService;
  let model: Model<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService, { provide: getModelToken(Task.name), useValue: mockTaskModel }],
    }).compile();

    service = module.get<TasksService>(TasksService);
    model = module.get<Model<Task>>(getModelToken(Task.name));
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debe obtener todas las tareas de un usuario', async () => {
    const tasks = await service.getTasks(mockTask.userId.toString());
    expect(tasks).toEqual([mockTask]);
    expect(model.find).toHaveBeenCalledWith(
      { userId: new Types.ObjectId(mockTask.userId) },
      { createdAt: 0, updatedAt: 0 },
    );
  });

  it('debe obtener una tarea por su ID', async () => {
    const task = await service.getTaskById(mockTask._id.toString(), mockTask.userId.toString());
    expect(task).toEqual(mockTask);
    expect(model.findOne).toHaveBeenCalledWith(
      { _id: new Types.ObjectId(mockTask._id), userId: new Types.ObjectId(mockTask.userId) },
      { createdAt: 0, updatedAt: 0 },
    );
  });

  it('debe crear una tarea', async () => {
    jest.spyOn(model, 'create').mockResolvedValue(undefined);
    const createTaskDto: CreateTaskDto = { title: 'New Task', description: 'New Desc' };
    const result = await service.createTask(createTaskDto, mockTask.userId.toString());
    expect(model.create).toHaveBeenCalledWith({ ...createTaskDto, userId: new Types.ObjectId(mockTask.userId) });
    expect(result).toEqual(undefined);
  });

  it('debe actualizar una tarea', async () => {
    const updateTaskDto: UpdateTaskDto = { title: 'Updated Title', description: 'Updated Desc', done: true };
    const task = await service.updateTask(mockTask._id.toString(), updateTaskDto, mockTask.userId.toString());
    expect(task).toEqual(mockTask);
    expect(model.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: new Types.ObjectId(mockTask._id), userId: new Types.ObjectId(mockTask.userId) },
      updateTaskDto,
    );
  });

  it('debe eliminar una tarea', async () => {
    const task = await service.deleteTask(mockTask._id.toString(), mockTask.userId.toString());
    expect(task).toEqual(mockTask);
    expect(model.findOneAndDelete).toHaveBeenCalledWith({
      _id: new Types.ObjectId(mockTask._id),
      userId: new Types.ObjectId(mockTask.userId),
    });
  });
});
