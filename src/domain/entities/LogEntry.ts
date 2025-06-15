import { randomUUID } from 'crypto';

export class LogEntry {
    constructor(
        public readonly id: string,
        public readonly content: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ){}

    static create(content: string): LogEntry {
        const now = new Date();
        return new LogEntry(
          randomUUID(),
          content,
          now,
          now
        );
      }
}