import { queryOptions } from '@tanstack/react-query';
import {
  getAppointments,
  getPatientAppointmentStats,
  getPatientUpcomingAppointments,
} from '../actions/appointments';
import prisma from '../prisma';

type AppointmentWithRelations = Awaited<
  ReturnType<
    typeof prisma.appointment.findMany<{
      include: { patient: true; doctor: true };
    }>
  >
>;

export const appointmentQueryOptions = queryOptions({
  queryKey: ['appointments'],
  queryFn: async (): Promise<AppointmentWithRelations> => {
    const result = await getAppointments();
    if (!result.success) {
      throw new Error(result.error);
    }
    return result.data;
  },
});

export const patientAppointmentStatsOptions = queryOptions({
  queryKey: ['patientAppointmentStats'],
  queryFn: async () => {
    const result = await getPatientAppointmentStats();
    if (!result.success) {
      throw new Error(result.error);
    }
    return result.data;
  },
});

export const patientUpcomingAppointmentsOptions = queryOptions({
  queryKey: ['patientUpcomingAppointments'],
  queryFn: async () => {
    const result = await getPatientUpcomingAppointments();
    if (!result.success) {
      throw new Error(result.error);
    }
    return result.data;
  },
});
