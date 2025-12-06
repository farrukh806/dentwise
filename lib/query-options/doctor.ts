import { queryOptions } from '@tanstack/react-query';
import { getDoctors } from '../actions/doctors';
import prisma from '../prisma';

type DoctorWithCount = Awaited<
  ReturnType<
    typeof prisma.doctor.findMany<{
      include: { _count: { select: { appointments: true } } };
    }>
  >
>;

export const doctorQueryOptions = queryOptions({
  queryKey: ['doctors'],
  queryFn: async (): Promise<DoctorWithCount> => {
    const result = await getDoctors();
    if (!result.success) {
      throw new Error(result.error);
    }
    return result.data;
  },
});
