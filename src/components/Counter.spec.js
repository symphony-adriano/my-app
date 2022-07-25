import { fireEvent, render, screen } from "@testing-library/react"
import Counter from "./Counter"

describe('Counter', () => {
    it('should increase the counter', () => {
        render(<Counter />)
        expect(screen.getByText(/my count is 0/i)).toBeInTheDocument()
        const button = screen.getByText(/increase/i)
        fireEvent.click(button)
        expect(screen.getByText(/my count is 1/i)).toBeInTheDocument()
    })
})
