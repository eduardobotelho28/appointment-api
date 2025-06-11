import { z } from 'zod';

export const registerSchema = z.object({
  name    : z.string().min(3) ,
  email   : z.string().email(),
  password: z.string().min(6) ,
});

export const loginSchema = z.object({
  email   : z.string().email(),
  password: z.string().min(6) ,
});

export const appointmentSchema = z.object({
  title       : z.string().min(3)    ,
  description : z.string().optional(),
  place       : z.string().min(3)    ,
  dateTime    : z.string().refine(val => !isNaN(Date.parse(val)), {
    message   : "Data/hora inválida" ,
  }),
});
