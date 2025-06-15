import { LogService } from '../../domain/services/LogService';
import { LogDTO, LogDTOMapper } from '../dtos/LogDTO';

export class GetLogsUseCase {
  constructor(private readonly logService: LogService) {}

  async execute(): Promise<LogDTO[]> {
    const logs = await this.logService.getLogs();
    return logs.map(LogDTOMapper.toDTO);
  }
}