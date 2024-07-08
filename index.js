import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import registerUser from './api/registerUser.js';
import reviews from './api/reviews.js';
import firestoreHandler from './api/firestoreHandler.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/api/registerUser', registerUser);
app.post('/api/reviews', reviews);
app.get('/api/reviews', reviews);
app.post('/api/firestoreHandler', firestoreHandler);
app.get('/api/firestoreHandler', firestoreHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
