'use server';
import { startOfDay } from 'date-fns';

import { auth } from '@clerk/nextjs/server';
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

export async function getPatientAppointmentStats() {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, error: 'Patient must be logged in!' };
    const user = await prisma.patient.findUnique({ where: { clerkId: userId } });
    if (!user) return { success: false, error: 'Patient not found!' };
    const appointments = await prisma.appointment.findMany({
      where: { patientId: userId },
    });
    return { success: true, data: appointments };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch appointments';
    return { success: false, error: errorMessage };
  }
}

export async function getPatientUpcomingAppointments() {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, error: 'Patient must be logged in!' };
    const user = await prisma.patient.findUnique({ where: { clerkId: userId } });
    if (!user) return { success: false, error: 'Patient not found!' };
    const appointments = await prisma.appointment.findMany({
      where: { patientId: userId, dateTime: { gt: startOfDay(new Date()) }, status: 'SCHEDULED' },
      include: {
        doctor: { select: { name: true, imageUrl: true } },
        patient: { select: { firstName: true, lastName: true, email: true } },
      },
      orderBy: [{ dateTime: 'asc' }],
    });
    return { success: true, data: appointments };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch appointments';
    return { success: false, error: errorMessage };
  }
}
