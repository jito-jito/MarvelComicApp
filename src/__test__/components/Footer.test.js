import React from "react"
import '@testing-library/jest-dom'
import { Footer } from "../../components/Footer"
import { render, screen } from "@testing-library/react"

describe('<Footer>', () => {
  test('Should be render', () => {
    const { container } = render(<Footer/>)
    expect(container).toBeTruthy()
  })
  
  test(`Should have the text 'developed by jito-jito ❤'`, () => {
    render(<Footer/>)
    const footerTitle = screen.getByText('developed by jito-jito ❤', { exact: false })
    expect(footerTitle).toBeTruthy()
  })
})
