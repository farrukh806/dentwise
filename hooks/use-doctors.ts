import { getDoctors } from '@/lib/actions/doctors';
import { useQuery } from '@tanstack/react-query';

export function useGetDoctors() {
  return useQuery({
    queryKey: ['doctors'],
    queryFn: async () => {
      const result = await getDoctors();
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
  });
}
