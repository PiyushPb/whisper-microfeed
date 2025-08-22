"use client";

import { useModal } from "@/context/ModalContext";
import DeletePostConfirmation from "./DeletePostConfirmation";
import EditContentModal from "./EditContentModal";

export default function ModalRenderer() {
  const { modal, closeModal } = useModal();

  if (!modal.type) return null;

  switch (modal.type) {
    case "delete":
      return (
        <DeletePostConfirmation
          isOpen={true}
          onClose={closeModal}
          onConfirm={modal.props?.onConfirm}
          loading={modal.props?.loading || false}
        />
      );

    case "edit":
      return (
        <EditContentModal
          post_id={modal.props?.post_id}
          isOpen={true}
          onClose={closeModal}
          onConfirm={modal.props?.onConfirm}
          loading={modal.props?.loading || false}
        />
      );

    default:
      return null;
  }
}
