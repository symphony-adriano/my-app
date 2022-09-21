
import { render, screen } from "@testing-library/react"
import BasicLink from "./BasicLink"

describe('BasicLink', () => {
    it('should do something', () => {
        render(<BasicLink />)
        screen.debug()
    })
})