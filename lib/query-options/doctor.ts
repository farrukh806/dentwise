import { queryOptions } from '@tanstack/react-query';
import { getDoctors } from '../actions/doctors';

export const doctorQueryOptions = queryOptions({
  queryKey: ['doctors'],
  queryFn: getDoctors,
});
