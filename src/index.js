import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
// app.use('/api/v1', routes);
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
