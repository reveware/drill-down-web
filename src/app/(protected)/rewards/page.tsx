import { RewardsGallery, RewardProgress } from '@/features/rewards';

export default function RewardsPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-4 px-2 py-4">
      <h2 className="text-md font-title text-2xl font-bold">Rewards</h2>
      <RewardProgress />
      <RewardsGallery />
    </div>
  );
}
