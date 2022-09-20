import { useEffect, useRef, useState } from "react"
import { stopPropagation } from "../../utils"

import './styles.css'

const InputModal = ({ initialValue, onSubmit, onClose }) => {
  const [value, setValue] = useState(initialValue)
  const inputRef = useRef(null)
  const modalRef = useRef(null)

  const onChange = e => {
    setValue(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit(value)
    onClose()
  }

  useEffect(() => {
    inputRef.current.focus()
  })

  return (
    <div className="modal--overlay" onClick={onClose}>
      <div className="modal" ref={modalRef} onClick={stopPropagation}>
        <h4>Insert a new value</h4>
        <form action="?" onSubmit={handleSubmit}>
          <input ref={inputRef} type="text" onChange={onChange} value={value} />
          <button>Save new value</button>
        </form>
      </div>
    </div>
  )
}

export default InputModal
