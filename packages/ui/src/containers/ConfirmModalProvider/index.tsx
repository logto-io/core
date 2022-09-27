import { Nullable } from '@silverhand/essentials';
import { useState, useRef, useMemo, createContext, useCallback } from 'react';

import { WebModal, MobileModal, ModalProps } from '@/components/ConfirmModal';
import usePlatform from '@/hooks/use-platform';

export type ChildRenderProps = {
  confirm: (data?: unknown) => void;
  cancel: (data?: unknown) => void;
};

type ConfirmModalState = Omit<ModalProps, 'onClose' | 'onConfirm' | 'children'> & {
  ModalContent: string | ((props: ChildRenderProps) => Nullable<JSX.Element>);
};

type ConfirmModalProps = Omit<ConfirmModalState, 'isOpen'>;

type ConfirmModalContextType = {
  show: (props: ConfirmModalProps) => Promise<[boolean, unknown?]>;
  confirm: (data?: unknown) => void;
  cancel: (data?: unknown) => void;
};

const noop = () => {
  throw new Error('Context provider not found');
};

export const ConfirmModalContext = createContext<ConfirmModalContextType>({
  show: async () => [true],
  confirm: noop,
  cancel: noop,
});

type Props = {
  children?: React.ReactNode;
};

const defaultModalState: ConfirmModalState = {
  isOpen: false,
  ModalContent: () => null,
};

const ConfirmModalProvider = ({ children }: Props) => {
  const [modalState, setModalState] = useState<ConfirmModalState>(defaultModalState);

  const resolver = useRef<(value: [result: boolean, data?: unknown]) => void>();

  const { isMobile } = usePlatform();

  const ConfirmModal = isMobile ? MobileModal : WebModal;

  const handleShow = useCallback(async (props: ConfirmModalProps) => {
    resolver.current?.([false]);

    setModalState({
      isOpen: true,
      ...props,
    });

    return new Promise<[result: boolean, data?: unknown]>((resolve) => {
      // eslint-disable-next-line @silverhand/fp/no-mutation
      resolver.current = resolve;
    });
  }, []);

  const handleConfirm = useCallback((data?: unknown) => {
    resolver.current?.([true, data]);
    setModalState(defaultModalState);
  }, []);

  const handleCancel = useCallback((data?: unknown) => {
    resolver.current?.([false, data]);
    setModalState(defaultModalState);
  }, []);

  const contextValue = useMemo(
    () => ({
      show: handleShow,
      confirm: handleConfirm,
      cancel: handleCancel,
    }),
    [handleCancel, handleConfirm, handleShow]
  );

  const { ModalContent, ...restProps } = modalState;

  return (
    <ConfirmModalContext.Provider value={contextValue}>
      {children}
      <ConfirmModal {...restProps} onConfirm={handleConfirm} onClose={handleCancel}>
        {typeof ModalContent === 'string' ? (
          ModalContent
        ) : (
          <ModalContent confirm={handleConfirm} cancel={handleCancel} />
        )}
      </ConfirmModal>
    </ConfirmModalContext.Provider>
  );
};

export default ConfirmModalProvider;
