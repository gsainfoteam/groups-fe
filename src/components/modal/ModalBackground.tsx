import { PropsWithChildren } from "react";

const ModalBackground = ({ children }: PropsWithChildren) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      {children}
    </div>
  );
};

export default ModalBackground;
