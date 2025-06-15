import { Firestore } from 'firebase-admin/firestore';
import { LogEntry } from '../../domain/entities/LogEntry';
import { ILogRepository } from '../../domain/repositories/ILogRepository';

export class FirebaseLogRepository implements ILogRepository {
  private readonly collection = 'logs';

  constructor(private readonly firestore: Firestore) {}

  async save(logEntry: LogEntry): Promise<void> {
    await this.firestore
      .collection(this.collection)
      .doc(logEntry.id)
      .set({
        content: logEntry.content,
        createdAt: logEntry.createdAt,
        updatedAt: logEntry.updatedAt
      });
  }

  async findById(id: string): Promise<LogEntry | null> {
    const doc = await this.firestore
      .collection(this.collection)
      .doc(id)
      .get();

    if (!doc.exists) return null;

    const data = doc.data();
    return new LogEntry(
      doc.id,
      data!.content,
      data!.createdAt.toDate(),
      data!.updatedAt.toDate()
    );
  }

  async findAll(): Promise<LogEntry[]> {
    const snapshot = await this.firestore
      .collection(this.collection)
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map(doc => {
      const data = doc.data();
      return new LogEntry(
        doc.id,
        data.content,
        data.createdAt.toDate(),
        data.updatedAt.toDate()
      );
    });
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<LogEntry[]> {
    const snapshot = await this.firestore
      .collection(this.collection)
      .where('createdAt', '>=', startDate)
      .where('createdAt', '<=', endDate)
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map(doc => {
      const data = doc.data();
      return new LogEntry(
        doc.id,
        data.content,
        data.createdAt.toDate(),
        data.updatedAt.toDate()
      );
    });
  }

  async delete(id: string): Promise<void> {
    await this.firestore
      .collection(this.collection)
      .doc(id)
      .delete();
  }
}