// src/context/ModalContext.tsx
"use client";

import React, { createContext, useContext, useState } from "react";

type ModalType = "delete" | "edit" | "custom" | null;

type ModalState = {
  type: ModalType;
  props?: Record<string, any>;
};

type ModalContextType = {
  modal: ModalState;
  openModal: (type: ModalType, props?: Record<string, any>) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<ModalState>({ type: null, props: {} });

  const openModal = (type: ModalType, props: Record<string, any> = {}) => {
    setModal({ type, props });
  };

  const closeModal = () => setModal({ type: null, props: {} });

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
