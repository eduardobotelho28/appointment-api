import { appointmentRepository } from '../repositories/appointmentRepository';

export const appointmentService = {

  async createAppointment(userId: number, data: { title: string; description?: string; place: string; dateTime: Date }) {
    return appointmentRepository.create({
      ...data,
      userId,
    });
  },

  async getAppointmentsByUser(userId: number) {
    return appointmentRepository.findByUserId(userId);
  },

  async getAppointmentById(id: number) {
    return appointmentRepository.findById(id);
  },

  async updateAppointment(userId: number, appointmentId: number, data: Partial<{ title: string; description?: string; place: string; dateTime: Date }>) {
    const appointment = await appointmentRepository.findById(appointmentId);
    if (!appointment || appointment.userId !== userId) throw new Error('Compromisso não encontrado ou acesso negado');

    return appointmentRepository.update(appointmentId, data);
  },

  async deleteAppointment(userId: number, appointmentId: number) {
    const appointment = await appointmentRepository.findById(appointmentId);
    if (!appointment || appointment.userId !== userId) throw new Error('Compromisso não encontrado ou acesso negado');

    return appointmentRepository.delete(appointmentId);
  },
  
};
