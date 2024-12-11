import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
const app = express();
import router from './api/v1/routes/participantRoute.js';
dotenv.config();
const PORT = process.env.PORT || 3000;
import './api/database/database.js'; 

let corsOptions = {
  origin: '*', 
};
app.use(cors(corsOptions));
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use('/api/v1', router);
app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server is successfully running and listening on port ${PORT}`);
  } else {
    console.error("Error occurred, server can't start", error);
    process.exit(1); 
  }
});
