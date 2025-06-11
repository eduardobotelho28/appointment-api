import bcrypt             from 'bcryptjs';
import jwt                from 'jsonwebtoken';
import { userRepository } from '../repositories/userRepository';
import dotenv             from 'dotenv';

dotenv.config();

export const userService = {

  async register(name: string, email: string, password: string) {

    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) throw new Error('Email já registrado');

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userRepository.create({
      name,
      email,
      password: hashedPassword,
      role: 'USER',
    });

    return user;
  },

  async login(email: string, password: string) {
    
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error('Usuário ou senha inválidos');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Usuário ou senha inválidos');

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    return { token, user };
  },

  async getAllUsers() {
    return userRepository.findAll();
  },

  async getUserById(id: number) {
    return userRepository.findById(id);
  },

  async updateUser(id: number, data: Partial<{ name: string; email: string; password: string; role: 'USER' | 'ADMIN' }>) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return userRepository.update(id, data);
  },

  async deleteUser(id: number) {
    return userRepository.delete(id);
  },
};
