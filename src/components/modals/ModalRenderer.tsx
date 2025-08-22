"use client";

import { useModal } from "@/context/ModalContext";
import DeletePostConfirmation from "./DeletePostConfirmation";
import EditContentModal from "./EditContentModal";
import { DeleteModalProps, EditModalProps } from "@/types/modalTypes";

export default function ModalRenderer() {
  const { modal, closeModal } = useModal();

  if (!modal.type) return null;

  switch (modal.type) {
    case "delete": {
      const props = modal.props as DeleteModalProps;
      return (
        <DeletePostConfirmation
          isOpen={true}
          onClose={closeModal}
          onConfirm={props.onConfirm}
          loading={props.loading || false}
        />
      );
    }

    case "edit": {
      const props = modal.props as EditModalProps;
      return (
        <EditContentModal
          isOpen={true}
          onClose={closeModal}
          post_id={props.post_id}
          onConfirm={props.onConfirm}
          loading={props.loading || false}
        />
      );
    }

    default:
      return null;
  }
}
