import { sleep } from '@/lib/utils';
import { PersonaOverview } from '@/types/persona';
import { PaginatedResponse } from '@/types/pagination';
import { SearchPersonasParams } from '@/api/endpoints/persona.api';

export const mockCompanion: PersonaOverview = {
  id: 'companion',
  slug: 'companion',
  name: 'Drill',
  description: 'Your personal companion to help you drill into anything.',
  avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
  is_active: true,
};

const mockPersonas: PersonaOverview[] = [
  mockCompanion,
  {
    id: 'persona-curious',
    slug: 'curious',
    name: 'Curious',
    description: 'Asks open-ended questions to help you dig deeper.',
    avatar: 'https://randomuser.me/api/portraits/lego/2.jpg',
    is_active: true,
  },
  {
    id: 'persona-skeptic',
    slug: 'skeptic',
    name: 'Skeptic',
    description: 'Challenges your assumptions and stress-tests your ideas.',
    avatar: 'https://randomuser.me/api/portraits/lego/3.jpg',
    is_active: true,
  },
];

export const mockGetCompanion = async (): Promise<PersonaOverview> => {
  await sleep(150);
  return mockCompanion;
};

export const mockSearchPersonas = async (
  params: SearchPersonasParams
): Promise<PaginatedResponse<PersonaOverview>> => {
  await sleep(150);

  const { query = '', is_active, page = 1, page_size = 25 } = params;

  const filtered = mockPersonas.filter((p) => {
    const matchesQuery = query
      ? p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.slug.toLowerCase().includes(query.toLowerCase())
      : true;
    const matchesActive = is_active === undefined ? true : p.is_active === is_active;
    return matchesQuery && matchesActive;
  });

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / page_size));
  const startIndex = (page - 1) * page_size;
  const items = filtered.slice(startIndex, startIndex + page_size);

  return {
    data: items,
    page,
    total: totalItems,
    total_pages: totalPages,
    is_last_page: page >= totalPages,
  };
};
