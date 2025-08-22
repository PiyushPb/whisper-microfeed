import { ProfileResponse } from "@/types/profile";
import { useState } from "react";

export function useProfile() {
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchProfile(username: string) {
    setLoading(true);
    setError(null);

    if (!username) {
      setError("No username provided.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/user/${username}`);

      // Handle non-OK responses before parsing JSON
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to fetch profile: ${res.status} ${errorText}`);
      }

      const data = await res.json();
      console.log("Fetched profile data:", data);
      setProfile(data);
    } catch (error) {
      console.error("Profile fetch error:", error);
      setError(
        error instanceof Error ? error.message : "An unknown error occurred."
      );
    } finally {
      setLoading(false);
    }
  }

  return {
    profile,
    loading,
    error,
    fetchProfile,
  };
}
