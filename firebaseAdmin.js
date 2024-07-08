import * as admin from 'firebase-admin';
import { validateFirestoreRequest } from './validateFirestoreRequest';

if (!admin.apps.length) {
  const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY;
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: firebasePrivateKey.replace(/\\n/g, '\n'),
    }),
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
  });
}

export async function firestoreRequest(params) {
  try {
    validateFirestoreRequest(params);
  } catch (error) {
    console.error('Firestore request validation failed:', error.message);
    throw error;
  }
}

export default admin;
