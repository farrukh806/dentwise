'use server';

import prisma from '../prisma';
import { AddDoctor } from '@/app/validations/add-doctor';

export async function getDoctors() {
  try {
    const doctors = await prisma.doctor.findMany({
      include: { _count: { select: { appointments: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return doctors;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createDoctor(data: AddDoctor) {
  try {
    const doctor = await prisma.doctor.create({
      data: {
        name: data.name,
        email: data.email,
        gender: data.gender,
        phone: data.phone,
        speciality: data.speciality,
        isActive: data.status === 'active', // Map status string to isActive boolean
        imageUrl: `https://avatar.iran.liara.run/public/${data.gender === 'MALE' ? 'boy' : 'girl'}`,
      },
    });
    return doctor;
  } catch (error) {
    console.error('Error creating doctor:', error);
    throw error;
  }
}

export async function updateDoctor(data: AddDoctor & { id: string }) {
  try {
    const doctor = await prisma.doctor.update({
      where: { id: data.id },
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        speciality: data.speciality,
        gender: data.gender,
        isActive: data.status === 'active',
      },
    });
    return doctor;
  } catch (error) {
    console.error('Error updating doctor:', error);
    throw error;
  }
}
