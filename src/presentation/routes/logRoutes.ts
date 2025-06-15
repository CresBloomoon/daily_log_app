import { Router } from 'express';
import { LogController } from '../controllers/LogController';
import { apiKeyAuth } from '../middleware/apiKeyAuth';

export const createLogRoutes = (logController: LogController): Router => {
  const router = Router();

  router.post('/logs', apiKeyAuth, (req, res) => logController.createLog(req, res));
  router.get('/logs', apiKeyAuth, (req, res) => logController.getLogs(req, res));
  router.get('/logs/range', apiKeyAuth, (req, res) => logController.getLogsByDateRange(req, res));

  return router;
};