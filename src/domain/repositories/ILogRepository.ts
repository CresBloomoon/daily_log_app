import { LogEntry } from '../entities/LogEntry';

export interface ILogRepository {
  save(logEntry: LogEntry): Promise<void>;
  findById(id: string): Promise<LogEntry | null>;
  findAll(): Promise<LogEntry[]>;
  findByDateRange(startDate: Date, endDate: Date): Promise<LogEntry[]>;
  delete(id: string): Promise<void>;
}