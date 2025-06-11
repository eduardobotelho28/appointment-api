import { Request, Response }  from 'express';
import { appointmentService } from '../services/appointmentService';
import { appointmentSchema }  from '../utils/validation';

export const appointmentController = {

  async create(req: Request, res: Response) {
    try {
      const userId = (req as any).user.userId;
      const data = appointmentSchema.parse(req.body);
      const appointment = await appointmentService.createAppointment(userId, {
        ...data,
        dateTime: new Date(data.dateTime),
      });
      res.status(201).json(appointment);
    } catch (err: any) {
      res.status(400).json({ error: err.message || 'Erro ao criar compromisso' });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const userId = (req as any).user.userId;
      const appointments = await appointmentService.getAppointmentsByUser(userId);
      res.json(appointments);
    } catch {
      res.status(500).json({ error: 'Erro ao buscar compromissos' });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const userId = (req as any).user.userId;
      const id = Number(req.params.id);
      const appointment = await appointmentService.getAppointmentById(id);
      if (!appointment || appointment.userId !== userId)
        return res.status(404).json({ error: 'Compromisso não encontrado' });
      res.json(appointment);
    } catch {
      res.status(500).json({ error: 'Erro ao buscar compromisso' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const userId = (req as any).user.userId;
      const id = Number(req.params.id);
      let data = req.body;
      if (data.dateTime) {
        data.dateTime = new Date(data.dateTime);
      }
      const updated = await appointmentService.updateAppointment(userId, id, data);
      res.json(updated);
    } catch (err: any) {
      res.status(400).json({ error: err.message || 'Erro ao atualizar compromisso' });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const userId = (req as any).user.userId;
      const id = Number(req.params.id);
      await appointmentService.deleteAppointment(userId, id);
      res.json({ message: 'Compromisso deletado' });
    } catch (err: any) {
      res.status(400).json({ error: err.message || 'Erro ao deletar compromisso' });
    }
  },
  
};
