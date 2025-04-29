// hooks/useConfirmationModal.ts
import { useState } from 'react';

interface ConfirmationModalOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

const useConfirmationModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalProps, setModalProps] = useState<ConfirmationModalOptions>({
    title: 'Are you sure?',
    message: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
  });
  const [resolvePromise, setResolvePromise] = useState<(value: boolean) => void>(() => {});

  const showConfirmation = (options: ConfirmationModalOptions): Promise<boolean> => {
    setModalProps({
      title: options.title || 'Are you sure?',
      message: options.message,
      confirmText: options.confirmText || 'Confirm',
      cancelText: options.cancelText || 'Cancel',
    });
    setIsOpen(true);

    return new Promise((resolve) => {
      setResolvePromise(() => resolve);
    });
  };

  const handleConfirm = () => {
    setIsOpen(false);
    resolvePromise(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
    resolvePromise(false);
  };

  return {
    isOpen,
    showConfirmation,
    handleConfirm,
    handleCancel,
    modalProps,
  };
};

export default useConfirmationModal;