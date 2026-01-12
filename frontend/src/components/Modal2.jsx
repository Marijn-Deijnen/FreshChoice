import "./Modal.css";
import { createPortal } from "react-dom";

const Modal = ({ open, children }) => {
  if (!open) return null;

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
