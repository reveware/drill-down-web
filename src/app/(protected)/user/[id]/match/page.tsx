'use client';
import { useParams } from 'next/navigation';
import { AffinityMatch } from '@/features/affinity';

export default function UserMatchPage() {
  const params = useParams();
  const userId = params.id as string;

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-4 p-4">
      <AffinityMatch userId={userId} />
    </div>
  );
}
