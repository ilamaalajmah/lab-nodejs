import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import articleRouter from './routes/articleRouter.js';
import blogRouter from './routes/blogRouter.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use('/api', articleRouter);
app.use('/api', blogRouter);
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('Error:', err));
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});