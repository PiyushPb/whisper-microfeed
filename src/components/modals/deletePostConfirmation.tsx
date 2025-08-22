// @/components/modals/deletePostConfirmation.tsx
import React from "react";
import { Button } from "../ui/button";
import { BarLoader } from "react-spinners";

interface DeletePostConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

const DeletePostConfirmation: React.FC<DeletePostConfirmationProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  if (!isOpen) return null;

  return (
    <section className="fixed inset-0 flex items-center justify-center bg-black/50 z-[99999]">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h3 className="text-xl font-semibold">Are you absolutely sure?</h3>
        <p className="text-sm text-gray-600 mt-2">
          This action cannot be undone. This will permanently delete your post.
        </p>
        <div className="flex justify-start gap-4 mt-4">
          <Button onClick={onClose} variant={"outline"}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            variant={"destructive"}
            disabled={loading}
          >
            {loading ? <BarLoader color="#ffffff" width={100} /> : "Continue"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DeletePostConfirmation;
