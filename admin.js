import * as admin from 'firebase-admin';
import { validateFirestoreRequest } from './validateFirestoreRequest';
import dotenv from 'dotenv';

dotenv.config();

if (!admin.apps.length) {
  const firebasePrivateKey = process.env.VITE_FIREBASE_PRIVATE_KEY;
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.VITE_FIREBASE_PROJECT_ID,
      clientEmail: process.env.VITE_FIREBASE_CLIENT_EMAIL,
      privateKey: firebasePrivateKey.replace(/\\n/g, '\n'),
    }),
    databaseURL: `https://${process.env.VITE_FIREBASE_PROJECT_ID}.firebaseio.com`
  });
    console.log('Firebase Admin SDK initialized successfully');
}

export async function firestoreRequest(params) {
  try {
    validateFirestoreRequest(params);
  } catch (error) {
    console.error('Firestore request validation failed:', error.message);
    throw error;
  }
}

export async function firestoreGetRequest(queryParams) {
  const db = admin.firestore();
  const collection = db.collection('your-collection-name');
  let query = collection;

  if (queryParams.someField) {
    query = query.where('someField', '==', queryParams.someField);
  }

  const snapshot = await query.get();
  const results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return results;
}

export default admin;
