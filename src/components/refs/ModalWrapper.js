import { useState } from "react"
import InputModal from "./InputModal"

const ModalWrapper = () => {
  const [isOpenModal, setOpenModal] = useState(false)
  const [value, setValue] = useState(`D'Alema`)

  const initialValue = 'Initial D'
  const onClose = () => setOpenModal(false)

  return (
    <div className="app">
      <h4>{value}</h4>
      <button onClick={() => setOpenModal(!isOpenModal)}>Open</button>
      {isOpenModal && (
        <InputModal
          initialValue={initialValue}
          onSubmit={setValue}
          onClose={onClose}
        />
      )}
    </div>
  )
}

export default ModalWrapper
