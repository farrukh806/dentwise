import { z } from 'zod';

export const addDoctorSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.email({ error: 'Invalid email address' }),
  phone: z.string().trim().min(1, 'Phone is required'),
  speciality: z.string().trim().min(1, 'Speciality is required'),
  gender: z.enum(['MALE', 'FEMALE'], { error: 'Gender is required' }),
  status: z.enum(['active', 'inactive'], { error: 'Status is required' }),
});

export type AddDoctor = z.infer<typeof addDoctorSchema>;
