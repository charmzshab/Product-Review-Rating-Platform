import { Modal } from "react-bootstrap";

interface ModalComponentProps {
  children?: React.ReactNode;
  handleClose?: () => void;
  show?: boolean;
  modalTitle: string;
}

export default function ModalComponent({
  children,
  handleClose,
  show,
  modalTitle,
}: ModalComponentProps) {
  return (
    <Modal
      size="lg"
      centered={false}
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}
