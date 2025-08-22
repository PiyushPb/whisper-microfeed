"use client";

import React, { createContext, useContext, useState } from "react";
import { ModalPropsMap, ModalType } from "@/types/modalTypes";

type ModalState<T extends ModalType = ModalType> = {
  type: T | null;
  props?: T extends keyof ModalPropsMap ? ModalPropsMap[T] : undefined;
};

type ModalContextType = {
  modal: ModalState;
  openModal: <T extends ModalType>(type: T, props: ModalPropsMap[T]) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<ModalState>({ type: null });

  const openModal = <T extends ModalType>(type: T, props: ModalPropsMap[T]) => {
    setModal({ type, props });
  };

  const closeModal = () => setModal({ type: null });

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
}
