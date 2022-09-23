import { useState } from "react"

const INITIAL_LIST = [
    'learn React',
    'learn Vue',
    'learn Angular',
]

const ListWithAddItem = () => {
    const [value, setValue] = useState('')
    const [list, setList] = useState(INITIAL_LIST)

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    const handleSubmit = (event) => {
        if (value) {
            setList(list.concat(value))
        }
        setValue('')
        event.preventDefault() // prevents a browser reload/refresh
    }

    return (
        <div>
            <ul>
                {list.map(item => (
                    <li key={item}>{item}</li>
                ))}
            </ul>

            <form onSubmit={handleSubmit}>
                <input type="text" value={value} onChange={handleChange} />
                <button type="submit">Add Item</button>
            </form>
        </div>
    )
}

export default ListWithAddItem
