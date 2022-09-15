import { useState } from "react";
import Modal from "./Modal";

const ModalWrapper = () => {
  const [show, setShow] = useState(false)

  return (
    <div className="modal-wrapper">
      <button onClick={() => setShow(true)}>Show Modal</button>
      {show && (
        <Modal title={'My Modal!'} onClose={() => setShow(false)}>
          <p>My old little modal!</p>
        </Modal>
      )}
    </div>
  )
}

export default ModalWrapper
