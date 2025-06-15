import { FirebaseLogRepository } from '../../src/infrastructure/repositories/FirebaseLogRepository';
import { LogEntry } from '../../src/domain/entities/LogEntry';

describe('FirebaseLogRepository', () => {
  let repository: FirebaseLogRepository;
  let mockFirestore: any;

  beforeEach(() => {
    mockFirestore = {
      collection: jest.fn().mockReturnThis(),
      doc: jest.fn().mockReturnThis(),
      set: jest.fn(),
      get: jest.fn(),
      where: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      delete: jest.fn()
    };
    repository = new FirebaseLogRepository(mockFirestore);
  });

  it('should save a log entry', async () => {
    const logEntry = LogEntry.create('テストログ');
    await repository.save(logEntry);

    expect(mockFirestore.collection).toHaveBeenCalledWith('logs');
    expect(mockFirestore.doc).toHaveBeenCalledWith(logEntry.id);
    expect(mockFirestore.set).toHaveBeenCalled();
  });
});