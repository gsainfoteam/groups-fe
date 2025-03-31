import { createPortal } from "react-dom";
import { PropsWithChildren } from "react";
import ModalBackground from "./ModalBackground";
import useClickOutside from "@/hooks/useClickOutside";
import DefaultCard from "./DefaultCard";

export interface ModalProps extends PropsWithChildren {
  isWithDefaultFrame?: boolean;
  onClose?: () => void;
}

const Modal = ({
  isWithDefaultFrame = true,
  children,
  onClose,
}: ModalProps) => {
  const ref = useClickOutside<HTMLDivElement>(onClose ?? (() => {}));

  return createPortal(
    <ModalBackground>
      {isWithDefaultFrame ? (
        <DefaultCard ref={ref} onClose={onClose}>
          {children}
        </DefaultCard>
      ) : (
        <div ref={ref}>{children}</div>
      )}
    </ModalBackground>,
    document.body,
  ) as JSX.Element;
};

export default Modal;
