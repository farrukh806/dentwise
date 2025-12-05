import { getDoctors } from '@/lib/actions/doctors';
import { useQuery } from '@tanstack/react-query';

export function useGetDoctors() {
  return useQuery({ queryKey: ['doctors'], queryFn: getDoctors });
}
