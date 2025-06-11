
export type JwtUserPayload = {
  id: number;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
};
