'use server';

import prisma from '../prisma';
import { AddDoctor } from '@/app/validations/add-doctor';

type ActionResult<T> = { success: true; data: T } | { success: false; error: string };

type DoctorWithCount = Awaited<
  ReturnType<
    typeof prisma.doctor.findMany<{
      include: { _count: { select: { appointments: true } } };
    }>
  >
>;

export async function getDoctors(): Promise<ActionResult<DoctorWithCount>> {
  try {
    const doctors = await prisma.doctor.findMany({
      include: { _count: { select: { appointments: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, data: doctors };
  } catch (error) {
    console.error('Error fetching doctors:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch doctors';
    return { success: false, error: errorMessage };
  }
}

export async function createDoctor(
  data: AddDoctor
): Promise<ActionResult<Awaited<ReturnType<typeof prisma.doctor.create>>>> {
  try {
    // check whether the doctor already exists or not
    const existingDoctor = await prisma.doctor.findUnique({ where: { email: data.email } });
    if (existingDoctor) {
      return { success: false, error: `Doctor with email ${data.email} already exists` };
    }
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
    return { success: true, data: doctor };
  } catch (error) {
    console.error('Error creating doctor:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create doctor';
    return { success: false, error: errorMessage };
  }
}

export async function updateDoctor(
  data: AddDoctor & { id: string }
): Promise<ActionResult<Awaited<ReturnType<typeof prisma.doctor.update>>>> {
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
    return { success: true, data: doctor };
  } catch (error) {
    console.error('Error updating doctor:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to update doctor';
    return { success: false, error: errorMessage };
  }
}
