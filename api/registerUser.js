import admin from './firebaseAdmin';
import cors, { runMiddleware } from '../corsMiddleware';

export default async (req, res) => {
  await runMiddleware(req, res, cors);

  if (req.method === 'POST') {
    const { email, password } = req.body;
    try {
      const userRecord = await admin.auth().createUser({
        email: email,
        password: password,
      });
      const token = await admin.auth().createCustomToken(userRecord.uid);
      res.status(201).send({ token });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  } else {
    res.status(405).send({ error: 'Method not allowed' });
  }
};
