import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';
import uploadRoutes from './routes/uploadRoutes';
import templateRoutes from './routes/templateRoutes';
import posterRoutes from './routes/posterRoutes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/posters', posterRoutes);

// Test Route
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Political Poster API Server Running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});