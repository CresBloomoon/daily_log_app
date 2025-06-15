import { LogService } from '../../domain/services/LogService';
import { LogDTO, LogDTOMapper } from '../dtos/LogDTO';

export class GetLogsByDateRangeUseCase {
  constructor(private readonly logService: LogService) {}

  async execute(startDate: Date, endDate: Date): Promise<LogDTO[]> {
    const logs = await this.logService.getLogsByDateRange(startDate, endDate);
    return logs.map(LogDTOMapper.toDTO);
  }
}