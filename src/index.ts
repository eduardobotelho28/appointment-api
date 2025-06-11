import express           from 'express';
import dotenv            from 'dotenv';
import { PrismaClient }  from '@prisma/client';
import userRoutes        from './routes/userRoutes';
import appointmentRoutes from './routes/appointmentRoutes';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

const rootHandler = (_req: any, res: any) => res.json({ message: 'API Rodando' });
app.get('/', rootHandler as any);

app.use('/users', userRoutes);
app.use('/appointments', appointmentRoutes);

const PORT = process.env.PORT || 3000;

async function main() {
  try {
    await prisma.$connect();
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro na conexão com o banco:', error);
    process.exit(1);
  }
}

main();
