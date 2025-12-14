'use server';
import { startOfDay } from 'date-fns';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
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
    if (!userId) return { success: false, error: 'User must be logged in!' };
    const user = await prisma.patient.findUnique({ where: { clerkId: userId } });
    if (!user) return { success: false, error: 'User not found!' };
    const appointments = await prisma.appointment.findMany({
      where: { patientId: user.id },
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
    if (!userId) return { success: false, error: 'User must be logged in!' };
    const user = await prisma.patient.findUnique({ where: { clerkId: userId } });
    if (!user) return { success: false, error: 'User not found!' };
    const appointments = await prisma.appointment.findMany({
      where: { patientId: user.id, dateTime: { gt: startOfDay(new Date()) }, status: 'SCHEDULED' },
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

export async function getAppointmentTypes() {
  // Static types for now, could be moved to DB later
  const types = [
    {
      id: 'regular',
      title: 'Regular Checkup',
      duration: 60,
      price: 120,
    },
    {
      id: 'cleaning',
      title: 'Teeth Cleaning',
      duration: 45,
      price: 90,
    },
    {
      id: 'consultation',
      title: 'Consultation',
      duration: 30,
      price: 75,
    },
    {
      id: 'emergency',
      title: 'Emergency Visit',
      duration: 30,
      price: 150,
    },
  ];
  return { success: true, data: types };
}

export async function getAvailableSlots(date: Date, doctorId: string) {
  try {
    const start = startOfDay(date);
    const end = new Date(start);
    end.setHours(23, 59, 59, 999);

    const appointments = await prisma.appointment.findMany({
      where: {
        doctorId,
        dateTime: {
          gte: start,
          lte: end,
        },
        status: {
          not: 'CANCELED',
        },
      },
      select: {
        time: true,
        duration: true,
      },
    });

    // Generate slots from 9:00 to 17:00 every 30 mins
    const slots = [];
    const startTime = 9;
    const endTime = 17;

    for (let hour = startTime; hour < endTime; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

        // Check if slot is booked
        // Simple check: if any appointment starts at this time
        // In a real app, we'd check for overlaps based on duration
        const isBooked = appointments.some((appt) => appt.time === timeString);

        slots.push({
          id: timeString,
          time: timeString,
          booked: isBooked,
        });
      }
    }

    return { success: true, data: slots };
  } catch (error) {
    console.error('Error fetching available slots:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch slots';
    return { success: false, error: errorMessage };
  }
}

export async function createAppointment(data: {
  doctorId: string;
  date: Date;
  time: string;
  type: string;
  duration: number;
  price: number;
}) {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, error: 'User must be logged in!' };

    const user = await prisma.patient.findUnique({ where: { clerkId: userId } });
    if (!user) return { success: false, error: 'User not found!' };

    // Combine date and time
    const [hours, minutes] = data.time.split(':').map(Number);
    const appointmentDateTime = new Date(data.date);
    appointmentDateTime.setHours(hours, minutes, 0, 0);

    const appointment = await prisma.appointment.create({
      data: {
        dateTime: appointmentDateTime,
        time: data.time,
        duration: data.duration,
        status: 'SCHEDULED',
        reason: data.type, // Using type as reason for now
        patientId: user.id,
        doctorId: data.doctorId,
      },
    });

    revalidatePath('/dashboard');
    return { success: true, data: appointment };
  } catch (error) {
    console.error('Error creating appointment:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create appointment';
    return { success: false, error: errorMessage };
  }
}
