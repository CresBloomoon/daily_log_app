import { LogEntry } from '../entities/LogEntry';
import { ILogRepository } from '../repositories/ILogRepository';

export class LogService {
  constructor(private readonly logRepository: ILogRepository) {}

  async createLog(content: string): Promise<LogEntry> {
    const logEntry = LogEntry.create(content);
    await this.logRepository.save(logEntry);
    return logEntry;
  }

  async getLogs(): Promise<LogEntry[]> {
    return this.logRepository.findAll();
  }

  async getLogsByDateRange(startDate: Date, endDate: Date): Promise<LogEntry[]> {
    return this.logRepository.findByDateRange(startDate, endDate);
  }

  async getLogById(id: string): Promise<LogEntry | null> {
    return this.logRepository.findById(id);
  }

  async deleteLog(id: string): Promise<void> {
    await this.logRepository.delete(id);
  }
}