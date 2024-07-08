import { firestoreRequest, firestoreGetRequest } from './firebaseAdmin';

export default async (req, res) => {
  await runMiddleware(req, res, cors);

  if (req.method === 'POST') {
    try {
      const params = req.body;
      await firestoreRequest(params);
      res.status(200).send({ message: 'Request validated and processed' });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  } else if (req.method === 'GET') {
    try {
      const result = await firestoreGetRequest(req.query);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  } else {
    res.status(405).send({ error: 'Method not allowed' });
  }
};

async function firestoreGetRequest(queryParams) {
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