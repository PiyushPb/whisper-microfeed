export type ProfileResponse = {
  user: {
    id: string;
    username: string;
    created_at: string;
    name: string;
    is_verified: boolean;
    profile_url: string;
  };
  posts: Array<{
    id: string;
    content: string;
    created_at: string;
    updated_at: string;
    author: {
      id: string;
      name: string;
      username: string;
      is_verified: boolean;
      profile_url: string;
    };
    likeCount: number;
    isLiked: boolean;
  }>;
};
