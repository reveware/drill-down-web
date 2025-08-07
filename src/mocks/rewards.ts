import { sleep } from '@/lib/utils';
import { PaginatedResponse } from '@/types/pagination';
import { UserReward, RewardAssetType } from '@/types/reward';

export const generateRewards = (length: number): UserReward[] => {
  const rewards: UserReward[] = [];

  const descriptions = [
    'A serene mountain landscape at sunrise, with misty peaks and golden light reflecting off a pristine alpine lake surrounded by pine trees',
    'A futuristic cityscape at night with neon lights, flying cars, and towering glass buildings reaching into a starry sky',
    'A cozy coffee shop interior with warm lighting, vintage furniture, books on shelves, and steam rising from a freshly brewed cup',
    'A majestic lion in the African savanna, mane flowing in the wind, against a backdrop of acacia trees and a vibrant sunset',
    'An underwater coral reef scene with colorful tropical fish, sea turtles, and vibrant coral formations in crystal clear blue water',
    'A magical forest clearing with glowing mushrooms, fairy lights, and ancient trees covered in luminescent moss',
    'A vintage steam locomotive crossing a stone bridge over a rushing river, surrounded by autumn foliage in brilliant reds and golds',
    'A peaceful Japanese garden with a wooden bridge over a koi pond, cherry blossoms falling, and traditional stone lanterns',
    'A space station orbiting Earth with astronauts conducting a spacewalk, stars twinkling in the infinite darkness of space',
    'A medieval castle on a hilltop surrounded by rolling green meadows, with knights on horseback approaching the gates',
    'A tropical beach at sunset with palm trees swaying, crystal clear turquoise water, and seashells scattered on white sand',
    'A steampunk workshop filled with brass gears, copper pipes, vintage tools, and mechanical contraptions powered by steam',
    'A field of lavender in Provence during golden hour, with rolling hills, a rustic farmhouse, and bees buzzing among the purple flowers',
    'A northern lights display over a snowy landscape with pine trees, a log cabin with warm lights glowing in the windows',
    'A bustling street market in Marrakech with colorful spices, traditional crafts, ornate architecture, and people in flowing robes',
  ];

  for (let i = 1; i <= length; i++) {
    const date = new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString();
    const isRevealed = Math.random() > 0.3; // 70% chance of being revealed

    rewards.push({
      id: i.toString(),
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      type: RewardAssetType.IMAGE,
      content: `https://picsum.photos/seed/reward${i}/400/600`,
      revealed_at: isRevealed ? date : null,
      created_at: date,
      updated_at: date,
    });
  }

  // Sort by created_at descending (newest first)
  return rewards.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
};

export async function mockFetchRewards(
  page: number,
  pageSize: number
): Promise<PaginatedResponse<UserReward>> {
  await sleep(3);

  const allRewards = generateRewards(50); // Generate 50 mock rewards

  const start = page * pageSize;
  const totalPages = Math.ceil(allRewards.length / pageSize);

  const actualStart = start >= allRewards.length ? start % allRewards.length : start;
  const actualEnd = Math.min(actualStart + pageSize, allRewards.length);

  return {
    page,
    total: allRewards.length,
    data: allRewards.slice(actualStart, actualEnd),
    total_pages: totalPages,
    is_last_page: actualEnd >= allRewards.length,
  };
}
