import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

import userRoutes from './routes/userRoutes';
import learningPathRoutes from './routes/learningPathRoutes';
import communityPostRoutes from './routes/communityPostRoutes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'GuruSpot API is running' });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/users', userRoutes);
app.use('/api/learning-paths', learningPathRoutes);
app.use('/api/community-posts', communityPostRoutes);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export default app;
