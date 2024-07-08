import admin from './firebaseAdmin';
import cors, { runMiddleware } from '../corsMiddleware';

export default async (req, res) => {
  await runMiddleware(req, res, cors);

  if (req.method === 'POST') {
    const { userId, productId, rating, comment } = req.body;
    try {
      const newReview = {
        userId,
        productId,
        rating,
        comment,
        createdAt: new Date().toISOString()
      };
      const db = admin.firestore();
      const docRef = await db.collection('reviews').add(newReview);
      res.status(201).send({ id: docRef.id, ...newReview });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  } else if (req.method === 'GET') {
    try {
      const db = admin.firestore();
      const snapshot = await db.collection('reviews').get();
      const reviews = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(reviews);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  } else {
    res.status(405).send({ error: 'Method not allowed' });
  }
};