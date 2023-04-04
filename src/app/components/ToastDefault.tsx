import { Dispatch } from "react";
import { Col, Row, Toast } from "react-bootstrap";

interface IToastDefaultProps {
  message?: string;
  show: boolean;
  onClose: () => void;
}

const ToastDefault = ({ message = "", onClose, show }: IToastDefaultProps) => {
  return (
    <Col className="toast-style ">
      <Toast onClose={onClose} show={show} delay={5000} autohide>
        <Toast.Body className="text-success">{message}</Toast.Body>
      </Toast>
    </Col>
  );
};

export default ToastDefault;
