import { CreateLogUseCase } from '../../src/application/usecases/CreateLogUseCase';
import { LogService } from '../../src/domain/services/LogService';
import { ILogRepository } from '../../src/domain/repositories/ILogRepository';

describe('CreateLogUseCase', () => {
  let createLogUseCase: CreateLogUseCase;
  let mockLogService: jest.Mocked<LogService>;
  let mockLogRepository: jest.Mocked<ILogRepository>;

  beforeEach(() => {
    mockLogRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      findByDateRange: jest.fn(),
      delete: jest.fn()
    };
    mockLogService = new LogService(mockLogRepository) as jest.Mocked<LogService>;
    createLogUseCase = new CreateLogUseCase(mockLogService);
  });

  it('should create a new log', async () => {
    const content = 'テストログ';
    const result = await createLogUseCase.execute(content);

    expect(result.content).toBe(content);
    expect(result.id).toBeDefined();
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
  });
});