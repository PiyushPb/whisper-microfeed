"use client";
import React, { useEffect } from "react";
import ProfileCard from "@/components/auth/ProfileCard";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/context/AuthContext";
import HomeProfileSkeletonLoader from "@/components/skeleton/HomeProfileSkeletonLoader";
import PostListContainer from "@/components/post/PostListContainer";

function ProfilePage() {
  const { fetchProfile, loading, profile, error } = useProfile();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.username) {
      fetchProfile(user.username);
    }
  }, [user]);

  return (
    <section>
      <div className="p-5 border-b-[1px] border-border">
        {loading && <HomeProfileSkeletonLoader />}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {profile ? (
          <ProfileCard user={profile?.user} loading={loading} />
        ) : (
          !loading && <p>No profile data found.</p>
        )}
      </div>
      <div>
        <PostListContainer
          posts={profile?.posts || []}
          count={profile?.posts.length || 0}
          loading={loading}
          error={error}
          currentPage={1}
          totalPages={1}
          onPageChange={() => {}}
          fallBackText="No posts found"
        />
      </div>
    </section>
  );
}

export default ProfilePage;
