import { PrismaClient, Appointment } from '@prisma/client';

const prisma = new PrismaClient();

export const appointmentRepository = {
  async create(data: {
    title: string;
    description?: string;
    place: string;
    dateTime: Date;
    userId: number;
  }): Promise<Appointment> {
    return prisma.appointment.create({ data });
  },

  async findById(id: number): Promise<Appointment | null> {
    return prisma.appointment.findUnique({ where: { id } });
  },

  async findByUserId(userId: number): Promise<Appointment[]> {
    return prisma.appointment.findMany({ where: { userId } });
  },

  async update(id: number, data: {
    title?: string;
    description?: string;
    place?: string;
    dateTime?: Date;
  }): Promise<Appointment> {
    return prisma.appointment.update({ where: { id }, data });
  },

  async delete(id: number): Promise<Appointment> {
    return prisma.appointment.delete({ where: { id } });
  },
};
