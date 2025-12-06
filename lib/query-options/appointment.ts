import { queryOptions } from '@tanstack/react-query';
import { getAppointments } from '../actions/appointments';

export const appointmentQueryOptions = queryOptions({
  queryKey: ['appointments'],
  queryFn: getAppointments,
});
