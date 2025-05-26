import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PhotoPost, PostOverview, PostTypes } from '@/types/post';
import Image from 'next/image';

interface RecommendedPhotoPostsProps {
  posts: PhotoPost[];
}

export const RecommendedPhotoPosts = ({ posts }: RecommendedPhotoPostsProps) => {
  const title = 'Recommended Photos';
  const maxPosts = 12;

  const Header = () => {
    return (
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
    );
  };

  if (posts.length === 0) {
    return (
      <Card className="card">
        <Header />
        <CardContent>
          <div className="h-48 bg-muted/30 rounded-md flex items-center justify-center text-muted-foreground text-sm">
            No photo posts available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card">
      <Header />
      <CardContent className="px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 auto-rows-fr">
          {posts.slice(0, maxPosts).map((post) => (
            <div
              key={post.id}
              className="aspect-square relative overflow-hidden rounded-md bg-muted/20 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <Image
                src={post.content.urls[0]}
                alt={`Post by ${post.author.username}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
