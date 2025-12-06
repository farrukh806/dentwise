'use server';

import prisma from '../prisma';

export async function getAppointments() {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: { createdAt: 'desc' },
      include: { patient: true, doctor: true },
    });
    return appointments;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
