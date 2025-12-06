import { queryOptions } from '@tanstack/react-query';
import { getAppointments } from '../actions/appointments';
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
