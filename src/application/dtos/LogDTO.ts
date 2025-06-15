import { LogEntry } from "@/domain/entities/LogEntry";

export interface LogDTO {
    id: string;
    content: string;
    createdAt: string;  // ISO形式の日付文字列
    updatedAt: string;  // ISO形式の日付文字列
  }
  
  export class LogDTOMapper {
    static toDTO(logEntry: LogEntry): LogDTO {
      return {
        id: logEntry.id,
        content: logEntry.content,
        createdAt: logEntry.createdAt.toISOString(),
        updatedAt: logEntry.updatedAt.toISOString()
      };
    }
  }