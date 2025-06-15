import { LogController } from '../../src/presentation/controllers/LogController';
import { CreateLogUseCase } from '../../src/application/usecases/CreateLogUseCase';
import { GetLogsUseCase } from '../../src/application/usecases/GetLogsUseCase';
import { GetLogsByDateRangeUseCase } from '../../src/application/usecases/GetLogsByDateRangeUseCase';

describe('LogController', () => {
  let controller: LogController;
  let mockCreateLogUseCase: jest.Mocked<CreateLogUseCase>;
  let mockGetLogsUseCase: jest.Mocked<GetLogsUseCase>;
  let mockGetLogsByDateRangeUseCase: jest.Mocked<GetLogsByDateRangeUseCase>;

  beforeEach(() => {
    mockCreateLogUseCase = {
      execute: jest.fn()
    } as any;
    mockGetLogsUseCase = {
      execute: jest.fn()
    } as any;
    mockGetLogsByDateRangeUseCase = {
      execute: jest.fn()
    } as any;

    controller = new LogController(
      mockCreateLogUseCase,
      mockGetLogsUseCase,
      mockGetLogsByDateRangeUseCase
    );
  });

  it('should create a new log', async () => {
    const req = {
      body: { content: 'テストログ' }
    } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as any;

    await controller.createLog(req, res);

    expect(mockCreateLogUseCase.execute).toHaveBeenCalledWith('テストログ');
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });
});