import { Request, Response } from 'express';
import { CreateLogUseCase } from '../../application/usecases/CreateLogUseCase';
import { GetLogsUseCase } from '../../application/usecases/GetLogsUseCase';
import { GetLogsByDateRangeUseCase } from '../../application/usecases/GetLogsByDateRangeUseCase';

export class LogController {
  constructor(
    private readonly createLogUseCase: CreateLogUseCase,
    private readonly getLogsUseCase: GetLogsUseCase,
    private readonly getLogsByDateRangeUseCase: GetLogsByDateRangeUseCase
  ) {}

  async createLog(req: Request, res: Response): Promise<void> {
    try {
      const { content } = req.body;
      const log = await this.createLogUseCase.execute(content);
      res.status(201).json(log);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create log' });
    }
  }

  async getLogs(req: Request, res: Response): Promise<void> {
    try {
      const logs = await this.getLogsUseCase.execute();
      res.json(logs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch logs' });
    }
  }

  async getLogsByDateRange(req: Request, res: Response): Promise<void> {
    try {
      const { startDate, endDate } = req.query;
      const logs = await this.getLogsByDateRangeUseCase.execute(
        new Date(startDate as string),
        new Date(endDate as string)
      );
      res.json(logs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch logs by date range' });
    }
  }
}