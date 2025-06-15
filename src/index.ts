import express from 'express';
import dotenv from 'dotenv';
import { initializeFirebase } from './infrastructure/config/firebase';
import { FirebaseLogRepository } from './infrastructure/repositories/FirebaseLogRepository';
import { LogService } from './domain/services/LogService';
import { CreateLogUseCase, GetLogsUseCase, GetLogsByDateRangeUseCase } from './application/usecases';
import { LogController } from './presentation/controllers/LogController';
import { createLogRoutes } from './presentation/routes/logRoutes';
import { errorHandler } from './presentation/middleware/errorHandler';

// 環境変数の読み込み
dotenv.config();

// Firebaseの初期化
const firestore = initializeFirebase({
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
});

// 依存性の注入
const logRepository = new FirebaseLogRepository(firestore);
const logService = new LogService(logRepository);
const createLogUseCase = new CreateLogUseCase(logService);
const getLogsUseCase = new GetLogsUseCase(logService);
const getLogsByDateRangeUseCase = new GetLogsByDateRangeUseCase(logService);
const logController = new LogController(
  createLogUseCase,
  getLogsUseCase,
  getLogsByDateRangeUseCase
);

// Expressアプリケーションの設定
const app = express();
app.use(express.json());

// リクエストログ出力ミドルウェアをここに移動
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ルーティングの設定
app.use('/api', createLogRoutes(logController));

// エラーハンドリング
app.use(errorHandler);

// サーバーの起動
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});