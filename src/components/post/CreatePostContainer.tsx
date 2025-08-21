/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";
import { useMutatePost } from "@/hooks/use-mutate-post";

type CreatePostContainerProps = {
  refetchPosts?: () => void;
};

function CreatePostContainer({ refetchPosts }: CreatePostContainerProps) {
  const [content, setContent] = useState("");
  const [inputError, setInputError] = useState("");
  const { createPost, loading, error } = useMutatePost();
  const { user, loading: userLoading } = useAuth();

  const MAX_CONTENT_LENGTH = Number(
    process.env.NEXT_PUBLIC_MAX_POST_CONTENT_LIMIT || 280
  );

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    if (newContent.length > MAX_CONTENT_LENGTH) {
      setInputError("Post content is too long");
    } else {
      setInputError("");
    }
    setContent(newContent);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    const trimmedContent = content.trim();
    if (!trimmedContent || trimmedContent.length > MAX_CONTENT_LENGTH) return;

    const result = await createPost({ content: trimmedContent });

    if (result?.id) {
      setContent("");
      refetchPosts?.(); // ✅ Trigger re-fetch of posts
    }
  };

  return (
    <div className="w-full p-5 border-b-[1px] border-border flex flex-row gap-5">
      <div>
        <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
          {userLoading ? (
            <div className="w-full h-full bg-gray-200 animate-pulse"></div>
          ) : (
            <img
              src={user?.profile_url}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
      <form className="w-full" onSubmit={handleSubmit}>
        <Textarea
          placeholder="What's on your mind?"
          className="w-full max-h-[150px] resize-none"
          cols={10}
          value={content}
          onChange={handleContentChange}
        />

        {(inputError || error) && (
          <p className="text-red-500 text-sm mt-2">{inputError || error}</p>
        )}

        <div className="flex justify-end gap-5 items-center mt-5">
          {content.length > 0 && (
            <span>
              {content.length}/{MAX_CONTENT_LENGTH}
            </span>
          )}
          <Button
            disabled={!!inputError || content.trim().length === 0 || loading}
            type="submit"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-r-2 border-white"></div>
                <span>Posting...</span>
              </div>
            ) : (
              "Post"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreatePostContainer;
