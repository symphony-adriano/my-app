import { useState } from "react"

const ControlledInput = () => {
  const [value, setValue] = useState('')

  const onChange = event => setValue(event.target.value)

  return (
    <>
      <p>{value}</p>
      <input value={value} onChange={onChange} />
    </>
  )
}

export default ControlledInput
