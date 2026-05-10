import { useQuery } from '@tanstack/react-query';
import { PersonaApi } from '@/api/endpoints/persona.api';
import { PersonaOverview } from '@/types/persona';

export const useCompanion = () => {
  return useQuery<PersonaOverview>({
    queryKey: ['persona', 'companion'],
    queryFn: () => PersonaApi.getCompanion(),
  });
};
