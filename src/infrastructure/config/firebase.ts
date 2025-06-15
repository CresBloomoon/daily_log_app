import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

export const initializeFirebase = (serviceAccount: ServiceAccount) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }
  return admin.firestore();
};