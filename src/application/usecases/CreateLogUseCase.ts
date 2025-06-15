import { LogService } from '../../domain/services/LogService';
import { LogDTO, LogDTOMapper } from '../dtos/LogDTO';

export class CreateLogUseCase {
  constructor(private readonly logService: LogService) {}

  async execute(content: string): Promise<LogDTO> {
    const logEntry = await this.logService.createLog(content);
    return LogDTOMapper.toDTO(logEntry);
  }
}