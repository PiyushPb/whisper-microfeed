export type ModalType = "delete" | "edit" | "custom";

export interface DeleteModalProps {
  onConfirm: () => void;
  loading?: boolean;
}

export interface EditModalProps {
  post_id: string;
  onConfirm: () => void;
  loading?: boolean;
}

export interface CustomModalProps {
  title: string;
}

export type ModalPropsMap = {
  delete: DeleteModalProps;
  edit: EditModalProps;
  custom: CustomModalProps;
};
