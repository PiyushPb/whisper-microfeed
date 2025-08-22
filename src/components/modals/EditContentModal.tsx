"use client";
import React, { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { BarLoader } from "react-spinners";
import { useGetSinglePost, useUpdatePost } from "@/hooks/use-mutate-post";

interface EditPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (updatedContent: string) => void;
  post_id: string;
  loading: boolean;
}

function EditContentModal({
  post_id,
  isOpen,
  onClose,
  onConfirm,
  loading,
}: EditPostModalProps) {
  const { getSinglePost } = useGetSinglePost();
  const { updatePost, loading: updating } = useUpdatePost();
  const [originalContent, setOriginalContent] = useState("");
  const [postContent, setPostContent] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (isOpen && post_id) {
      const fetch = async () => {
        setIsFetching(true);
        const post = await getSinglePost(post_id);
        if (post) {
          setPostContent(post.content);
          setOriginalContent(post.content);
        }
        setIsFetching(false);
      };
      fetch();
    }
  }, [isOpen, post_id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = await updatePost(post_id, postContent);
    if (updated) {
      onConfirm(postContent);
      window.location.reload();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <section className="fixed inset-0 flex items-center justify-center bg-black/50 z-[99999]">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-[500px] w-full">
        <div>
          <h3 className="text-xl font-semibold">Edit Post</h3>
          <p className="text-sm text-gray-600">This action cannot be undone.</p>
        </div>

        <form className="mt-5" onSubmit={handleSubmit}>
          <Textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Edit your post"
            className="w-full h-[100px] resize-none"
            disabled={isFetching || updating}
          />
          <div className="flex gap-3 mt-5">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={
                updating ||
                isFetching ||
                postContent.trim() === originalContent.trim()
              }
            >
              {updating ? <BarLoader color="#ffffff" width={100} /> : "Edit"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default EditContentModal;
