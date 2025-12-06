'use server';

import prisma from '../prisma';

type ActionResult<T> = { success: true; data: T } | { success: false; error: string };

type AppointmentWithRelations = Awaited<
  ReturnType<
    typeof prisma.appointment.findMany<{
      include: { patient: true; doctor: true };
    }>
  >
>;

export async function getAppointments(): Promise<ActionResult<AppointmentWithRelations>> {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: { createdAt: 'desc' },
      include: { patient: true, doctor: true },
    });
    return { success: true, data: appointments };
  } catch (error) {
    console.error('Error fetching appointments:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch appointments';
    return { success: false, error: errorMessage };
  }
}
