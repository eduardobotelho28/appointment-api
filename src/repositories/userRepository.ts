import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export const userRepository = {
  async create(data: {
    name: string;
    email: string;
    password: string;
    role?: 'USER' | 'ADMIN'; 
  }): Promise<User> {
    return prisma.user.create({ data });
  },

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  },

  async findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  },

  async findAll(): Promise<User[]> {
    return prisma.user.findMany();
  },

  async update(id: number, data: {
    name?: string;
    email?: string;
    password?: string;
    role?: 'USER' | 'ADMIN';
  }): Promise<User> {
    return prisma.user.update({ where: { id }, data });
  },

  async delete(id: number): Promise<User> {
    return prisma.user.delete({ where: { id } });
  },
};
