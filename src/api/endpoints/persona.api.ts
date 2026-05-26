import { apiClient } from '../client';
import { USE_MOCKS } from '../constants';
import { PersonaOverview } from '@/types/persona';
import { PaginatedResponse } from '@/types/pagination';
import { mockGetCompanion, mockSearchPersonas } from '@/mocks/persona';

export interface SearchPersonasParams {
  query?: string;
  is_active?: boolean;
  page?: number;
  page_size?: number;
}

export const PersonaApi = {
  search: async (params: SearchPersonasParams): Promise<PaginatedResponse<PersonaOverview>> => {
    if (USE_MOCKS) {
      return mockSearchPersonas(params);
    }
    return (await apiClient.get<PaginatedResponse<PersonaOverview>>('/personas', { params })).data;
  },

  getCompanion: async (): Promise<PersonaOverview> => {
    if (USE_MOCKS) {
      return mockGetCompanion();
    }
    return (await apiClient.get<PersonaOverview>('/personas/companion')).data;
  },
};
