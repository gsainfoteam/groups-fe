import { createPortal } from "react-dom";
import { PropsWithChildren, useEffect, useState } from "react";
import ModalBackground from "./ModalBackground";
import useClickOutside from "@/hooks/useClickOutside";
import useKey from "@/hooks/useKey";
import usePreventScroll from "@/hooks/usePreventScroll";
import DefaultCard from "./DefaultCard";
import { cn } from "@/utils/clsx";

export interface ModalProps extends PropsWithChildren {
  isOpen?: boolean;
  isWithDefaultFrame?: boolean;
  isWithPreventScroll?: boolean;
  isWithAnimation?: boolean;
  onClose?: () => void;
}

const Modal = ({
  isOpen = true,
  isWithDefaultFrame = true,
  isWithPreventScroll = true,
  isWithAnimation = true,
  children,
  onClose,
}: ModalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // 모달 닫기 핸들러
  const handleClose = () => {
    if (!onClose) return;

    if (isWithAnimation) {
      setIsVisible(false);
      // 애니메이션 시간(300ms) 후에 실제로 닫기
      setTimeout(() => {
        onClose();
      }, 300);
    } else {
      onClose();
    }
  };

  const ref = useClickOutside<HTMLDivElement>(handleClose);

  useEffect(() => {
    // 마운트 시 상태 설정
    setIsMounted(true);
    // 마운트 후 바로 애니메이션 실행
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  // isOpen 상태 변화 감지
  useEffect(() => {
    if (!isOpen && isMounted) {
      setIsVisible(false);
    } else if (isOpen && isMounted) {
      setIsVisible(true);
    }
  }, [isOpen, isMounted]);

  useKey("Escape", handleClose);
  if (isWithPreventScroll) {
    usePreventScroll();
  }

  return createPortal(
    <ModalBackground isVisible={isVisible} isWithAnimation={isWithAnimation}>
      <div
        className={cn(
          "transition-all duration-300",
          isWithAnimation && isVisible
            ? "opacity-100 scale-100"
            : isWithAnimation
              ? "opacity-0 scale-95"
              : "opacity-100 scale-100",
        )}
      >
        {isWithDefaultFrame ? (
          <DefaultCard ref={ref} onClose={handleClose}>
            {children}
          </DefaultCard>
        ) : (
          <div ref={ref}>{children}</div>
        )}
      </div>
    </ModalBackground>,
    document.body,
  ) as JSX.Element;
};

export default Modal;
