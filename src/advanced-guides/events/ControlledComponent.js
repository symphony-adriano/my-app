import { useState } from "react"

const ControlledComponent = () => {
    const [value, setValue] = useState('#tofu')

    const handleChange = event => setValue(event.target.value)

    return (
        <div>
            <label>My Uncontrolled Input</label>
            <input type="text" value={value} onChange={handleChange} />

            <p>
                <strong>Output:</strong> {value}
            </p>
        </div>
    )
}

export default ControlledComponent
