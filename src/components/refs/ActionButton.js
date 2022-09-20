import React, { useRef } from "react";

const ActionButton = ({label, action}) => {
    const buttonRef = useRef(null)
    return (
        <button onClick={action} ref={buttonRef}>
            {label}
        </button>
    )
}

export default ActionButton
