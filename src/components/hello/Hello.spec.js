import { render, screen } from "@testing-library/react"
import Hello from "./Hello"

describe('Hello', () => {
    it('should say hello stranger', () => {
        render(<Hello />)
        expect(screen.getByText(/hello, stranger/i)).toBeInTheDocument()
    })
    it('should say hello user', () => {
        render(<Hello name='user'/>)
        expect(screen.getByText(/hello, user/i)).toBeInTheDocument()
    })
})
