import PopupDialog from "@/components/PopupDialog/PopupDialog";
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type FC,
  type ReactElement,
} from "react";

type Component = {
  component: ReactElement;
};

type ModalProviderProps = {
  children: ReactElement;
};

type ModalProviderContext = {
  openModal: ({ component }: Component) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalProviderContext>(
  {} as ModalProviderContext,
);

const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [modal, setModal] = useState<ReactElement | null>(null);

  const openModal = useCallback(
    ({ component }: Component) => {
      setModal(component);
    },
    [setModal],
  );

  const closeModal = useCallback(() => {
    setModal(null);
  }, [setModal]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <PopupDialog content={modal} closeModal={closeModal} />
    </ModalContext.Provider>
  );
};

const useModalContext = () => useContext(ModalContext);
export { ModalProvider, useModalContext };
