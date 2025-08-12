import { sleep } from '@/lib/utils';
import {
  UserAffinityScore,
  AffinityType,
  Affinity,
  AffinityTimeline,
  TimelineInterval,
  AffinityTimelineBucket,
} from '@/types/affinity';
import { mockUser, mockFollowedUser } from './user';
import { subDays } from 'date-fns';

export const mockFetchAffinityMatch = async (userId: string): Promise<UserAffinityScore> => {
  console.log('mockFetchAffinityMatch', userId);
  await sleep(1);

  const mockSharedAffinities: Affinity[] = [
    { type: AffinityType.TAG, name: 'photography', slug: 'photography', score: 0.8 },
    { type: AffinityType.TAG, name: 'travel', slug: 'travel', score: 0.7 },
    { type: AffinityType.THEME, name: 'nature', slug: 'nature', score: 0.6 },
  ];

  return {
    users: {
      a: mockUser,
      b: mockFollowedUser,
    },
    score: {
      overall: 0.75,
      percentage_asymmetric: 0.3,
      percentage_symmetric: 0.7,
      weighted_jaccard: 0.72,
      cosine_similarity: 0.78,
      by_type: {
        [AffinityType.TAG]: {
          overall: 0.8,
          strength: 0.85,
          percentage_asymmetric: 0.3,
          percentage_symmetric: 0.7,
          weighted_jaccard: 0.72,
          cosine_similarity: 0.78,
          counts: { a: 15, b: 12, shared: 8 },
          weights: { a: 0.6, b: 0.5, overlap: 0.4 },
          affinities: {
            shared: mockSharedAffinities,
            only_a: [],
            only_b: [],
          },
        },
        [AffinityType.THEME]: {
          overall: 0.65,
          strength: 0.7,
          percentage_asymmetric: 0.4,
          percentage_symmetric: 0.6,
          weighted_jaccard: 0.58,
          cosine_similarity: 0.62,
          counts: { a: 8, b: 10, shared: 5 },
          weights: { a: 0.4, b: 0.5, overlap: 0.3 },
          affinities: {
            shared: [],
            only_a: [],
            only_b: [],
          },
        },
        [AffinityType.STYLE]: {
          overall: 0.7,
          strength: 0.75,
          percentage_asymmetric: 0.35,
          percentage_symmetric: 0.65,
          weighted_jaccard: 0.65,
          cosine_similarity: 0.68,
          counts: { a: 6, b: 8, shared: 4 },
          weights: { a: 0.3, b: 0.4, overlap: 0.25 },
          affinities: {
            shared: [],
            only_a: [],
            only_b: [],
          },
        },
        [AffinityType.MOOD]: {
          overall: 0.6,
          strength: 0.65,
          percentage_asymmetric: 0.45,
          percentage_symmetric: 0.55,
          weighted_jaccard: 0.55,
          cosine_similarity: 0.58,
          counts: { a: 5, b: 7, shared: 3 },
          weights: { a: 0.25, b: 0.35, overlap: 0.2 },
          affinities: {
            shared: [],
            only_a: [],
            only_b: [],
          },
        },
      },
      profiles: {
        a: {
          [AffinityType.TAG]: 0.8,
          [AffinityType.THEME]: 0.7,
          [AffinityType.STYLE]: 0.75,
          [AffinityType.MOOD]: 0.65,
        },
        b: {
          [AffinityType.TAG]: 0.75,
          [AffinityType.THEME]: 0.8,
          [AffinityType.STYLE]: 0.7,
          [AffinityType.MOOD]: 0.6,
        },
      },
      meta: {
        coverage: 0.85,
        budgets: {
          [AffinityType.TAG]: 0.3,
          [AffinityType.THEME]: 0.25,
          [AffinityType.STYLE]: 0.25,
          [AffinityType.MOOD]: 0.2,
        },
        alphas: {
          [AffinityType.TAG]: 0.8,
          [AffinityType.THEME]: 0.7,
          [AffinityType.STYLE]: 0.75,
          [AffinityType.MOOD]: 0.65,
        },
        type_order: [AffinityType.TAG, AffinityType.THEME, AffinityType.STYLE, AffinityType.MOOD],
      },
    },
  };
};

export const mockFetchAffinityTimeline = async (
  userId: string,
  params?: {
    type?: AffinityType;
    start_date?: string;
    end_date?: string;
    interval?: TimelineInterval;
  }
): Promise<AffinityTimeline> => {
  console.log('mockFetchAffinityTimeline', userId, params);
  await sleep(3);

  const startDate = params?.start_date
    ? new Date(params.start_date)
    : new Date(subDays(Date.now(), 30));
  const endDate = params?.end_date ? new Date(params.end_date) : new Date();
  const interval = params?.interval || TimelineInterval.WEEK;

  // Expanded mock affinities with more variety
  const mockAffinities = [
    // TAGS
    { type: AffinityType.TAG, name: 'photography', slug: 'photography' },
    { type: AffinityType.TAG, name: 'travel', slug: 'travel' },
    { type: AffinityType.TAG, name: 'food', slug: 'food' },
    { type: AffinityType.TAG, name: 'fitness', slug: 'fitness' },
    { type: AffinityType.TAG, name: 'technology', slug: 'technology' },
    { type: AffinityType.TAG, name: 'books', slug: 'books' },
    { type: AffinityType.TAG, name: 'music', slug: 'music' },
    { type: AffinityType.TAG, name: 'art', slug: 'art' },
    { type: AffinityType.TAG, name: 'nature', slug: 'nature-tag' },
    { type: AffinityType.TAG, name: 'coffee', slug: 'coffee' },

    // THEMES
    { type: AffinityType.THEME, name: 'adventure', slug: 'adventure' },
    { type: AffinityType.THEME, name: 'minimalism', slug: 'minimalism' },
    { type: AffinityType.THEME, name: 'creativity', slug: 'creativity' },
    { type: AffinityType.THEME, name: 'wellness', slug: 'wellness' },
    { type: AffinityType.THEME, name: 'productivity', slug: 'productivity' },
    { type: AffinityType.THEME, name: 'sustainability', slug: 'sustainability' },
    { type: AffinityType.THEME, name: 'learning', slug: 'learning' },
    { type: AffinityType.THEME, name: 'community', slug: 'community' },

    // STYLES
    { type: AffinityType.STYLE, name: 'vintage', slug: 'vintage' },
    { type: AffinityType.STYLE, name: 'modern', slug: 'modern' },
    { type: AffinityType.STYLE, name: 'bohemian', slug: 'bohemian' },
    { type: AffinityType.STYLE, name: 'industrial', slug: 'industrial' },
    { type: AffinityType.STYLE, name: 'casual', slug: 'casual' },
    { type: AffinityType.STYLE, name: 'elegant', slug: 'elegant' },
    { type: AffinityType.STYLE, name: 'rustic', slug: 'rustic' },
    { type: AffinityType.STYLE, name: 'colorful', slug: 'colorful' },

    // MOODS
    { type: AffinityType.MOOD, name: 'peaceful', slug: 'peaceful' },
    { type: AffinityType.MOOD, name: 'energetic', slug: 'energetic' },
    { type: AffinityType.MOOD, name: 'contemplative', slug: 'contemplative' },
    { type: AffinityType.MOOD, name: 'playful', slug: 'playful' },
    { type: AffinityType.MOOD, name: 'dramatic', slug: 'dramatic' },
    { type: AffinityType.MOOD, name: 'nostalgic', slug: 'nostalgic' },
    { type: AffinityType.MOOD, name: 'optimistic', slug: 'optimistic' },
    { type: AffinityType.MOOD, name: 'mysterious', slug: 'mysterious' },
  ];

  // Generate mock timeline data
  const buckets: AffinityTimelineBucket[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    // Filter affinities by type if specified
    const filteredAffinities = params?.type
      ? mockAffinities.filter((affinity) => affinity.type === params.type)
      : mockAffinities;

    // Select 3-7 random affinities for each time period
    const selectedAffinities = filteredAffinities
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 5) + 3);

    selectedAffinities.forEach((affinity) => {
      // Create more realistic weight distributions
      let baseWeight = Math.random() * 0.6 + 0.2; // Base between 0.2-0.8

      // Add some trending effects for certain affinities
      if (['photography', 'travel', 'food'].includes(affinity.slug)) {
        baseWeight = Math.min(1.0, baseWeight + 0.2);
      }

      // Add seasonal variations
      const month = currentDate.getMonth();
      if (affinity.slug === 'fitness' && (month === 0 || month === 1)) {
        baseWeight = Math.min(1.0, baseWeight + 0.3); // New Year fitness trend
      }
      if (affinity.slug === 'travel' && month >= 5 && month <= 7) {
        baseWeight = Math.min(1.0, baseWeight + 0.2); // Summer travel
      }

      buckets.push({
        bucket: currentDate.toISOString(),
        type: affinity.type,
        slug: affinity.slug,
        name: affinity.name,
        total_weight: Number(baseWeight.toFixed(2)),
        post_count: Math.floor(baseWeight * 15) + 1, // Posts correlate with weight
      });
    });

    // Move to next interval
    switch (interval) {
      case TimelineInterval.DAY:
        currentDate.setDate(currentDate.getDate() + 1);
        break;
      case TimelineInterval.WEEK:
        currentDate.setDate(currentDate.getDate() + 7);
        break;
      case TimelineInterval.MONTH:
        currentDate.setMonth(currentDate.getMonth() + 1);
        break;
    }
  }

  return {
    type: params?.type || null,
    interval,
    start: startDate,
    end: endDate,
    buckets: buckets.sort((a, b) => new Date(a.bucket).getTime() - new Date(b.bucket).getTime()),
  };
};
