"use client";

import React, { useEffect } from "react";
import ProfileCard from "@/components/auth/ProfileCard";
import { useProfile } from "@/hooks/useProfile";
import HomeProfileSkeletonLoader from "@/components/skeleton/HomeProfileSkeletonLoader";
import PostListContainer from "@/components/post/PostListContainer";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

// Optional: a simple "User Not Found" component
function UserNotFound() {
  return (
    <div className="text-center py-20 text-gray-500">
      <h2 className="text-2xl font-semibold mb-2">User Not Found</h2>
      <p>The profile you&apos;re looking for does not exist.</p>
    </div>
  );
}

function ProfilePage() {
  const { fetchProfile, loading, profile, error } = useProfile();
  const params = useParams();

  const { user: currentUser } = useAuth();

  const isCurrentUser = currentUser?.username === params.username;

  const username = Array.isArray(params.username)
    ? params.username[0]
    : params.username;

  useEffect(() => {
    if (username) {
      fetchProfile(username);
    }
  }, [username]);

  const user = profile?.user;

  return (
    <section>
      <div className="p-5 border-b-[1px] border-border">
        {loading && <HomeProfileSkeletonLoader />}

        {!loading && !user && <UserNotFound />}

        {!loading && user && (
          <ProfileCard
            user={user}
            loading={loading}
            currentUser={isCurrentUser}
          />
        )}
      </div>

      <div>
        {!loading && user && (
          <PostListContainer
            posts={profile.posts || []}
            count={profile.posts.length || 0}
            loading={loading}
            error={null} // Don't pass raw error to the UI
            currentPage={1}
            totalPages={1}
            onPageChange={() => {}}
            fallBackText="No posts found"
          />
        )}
      </div>
    </section>
  );
}

export default ProfilePage;
