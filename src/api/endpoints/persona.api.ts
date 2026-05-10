import { apiClient } from '../client';
import { PersonaOverview } from '@/types/persona';
import { PaginatedResponse } from '@/types/pagination';

export interface SearchPersonasParams {
  query?: string;
  is_active?: boolean;
  page?: number;
  page_size?: number;
}

export const PersonaApi = {
  search: async (params: SearchPersonasParams): Promise<PaginatedResponse<PersonaOverview>> => {
    return (await apiClient.get<PaginatedResponse<PersonaOverview>>('/personas', { params })).data;
  },

  getCompanion: async (): Promise<PersonaOverview> => {
    return (await apiClient.get<PersonaOverview>('/personas/companion')).data;
  },
};
