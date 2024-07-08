import { firestoreRequest } from '../firebaseAdmin';
import cors, { runMiddleware } from '../corsMiddleware';

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
  } else {
    res.status(405).send({ error: 'Method not allowed' });
  }
};
