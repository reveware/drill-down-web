import { createContext, PropsWithChildren, useState } from 'react';
import { Modal } from '../shared/Modal/Modal';

type ModalPayload = {
  id: string;
  title?: string;
  content: React.ReactNode;
};

type ModalContextValue = {
  openModal: (payload: ModalPayload) => void;
  closeModal: () => void;
  currentModal: ModalPayload | null;
};

export const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [currentModal, setCurrentModal] = useState<ModalPayload | null>(null);

  const openModal = (payload: ModalPayload) => setCurrentModal(payload);

  const closeModal = () => setCurrentModal(null);

  return (
    <ModalContext.Provider value={{ openModal, closeModal, currentModal }}>
      {children}
      <Modal
        isOpen={!!currentModal}
        onClose={closeModal}
        title={currentModal?.title}
        content={currentModal?.content}
      />
    </ModalContext.Provider>
  );
};
