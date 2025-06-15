import { LogEntry } from '../../src/domain/entities/LogEntry';

describe('LogEntry', () => {
  it('should create a new log entry with correct properties', () => {
    const content = 'テストログ';
    const logEntry = LogEntry.create(content);

    expect(logEntry.content).toBe(content);
    expect(logEntry.id).toBeDefined();
    expect(logEntry.createdAt).toBeInstanceOf(Date);
    expect(logEntry.updatedAt).toBeInstanceOf(Date);
  });
});