import { Request, Response }           from 'express';
import { userService }                 from '../services/userService';
import { registerSchema, loginSchema } from '../utils/validation';

export const userController = {

  async register(req: Request, res: Response) {
    try {
      const data = registerSchema.parse(req.body);
      const user = await userService.register(data.name, data.email, data.password);
      res.status(201).json({ message: 'Usuário criado com sucesso', user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (err: any) {
      res.status(400).json({ error: err.message || 'Erro no registro' });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const data = loginSchema.parse(req.body);
      const { token, user } = await userService.login(data.email, data.password);
      res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (err: any) {
      res.status(401).json({ error: err.message || 'Erro no login' });
    }
  },

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      const sanitized = users.map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role }));
      res.json(sanitized);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  },

  async getUserById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const user = await userService.getUserById(id);
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
      res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
    } catch {
      res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  },

  async updateUser(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = req.body;
      const user = await userService.updateUser(id, data);
      res.json({ message: 'Usuário atualizado', user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (err: any) {
      res.status(400).json({ error: err.message || 'Erro na atualização' });
    }
  },

  async deleteUser(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await userService.deleteUser(id);
      res.json({ message: 'Usuário deletado' });
    } catch {
      res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
  },
  
};
