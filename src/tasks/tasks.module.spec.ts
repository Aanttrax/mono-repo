import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { getModelToken } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';
import { User } from '../auth/schemas/auth.schema';

describe('TasksModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        TasksService,
        {
          provide: getModelToken(Task.name),
          useValue: {
            find: jest.fn(), // Mock de métodos del modelo
            create: jest.fn(),
            findById: jest.fn(),
          },
        },
        {
          provide: getModelToken(User.name),
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();
  });

  it('Debe definir el módulo', () => {
    expect(module).toBeDefined();
  });

  it('Debe proveer TasksService', () => {
    const tasksService = module.get<TasksService>(TasksService);
    expect(tasksService).toBeDefined();
  });

  it('Debe proveer TasksController', () => {
    const tasksController = module.get<TasksController>(TasksController);
    expect(tasksController).toBeDefined();
  });
});
