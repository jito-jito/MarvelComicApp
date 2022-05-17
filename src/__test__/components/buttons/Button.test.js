import { Button } from '../../../components/buttons/Button'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'

describe('<Button>', () => {
  test('Should be render', () => {
    const { container } = render(<Button />)

    expect(container).toBeInTheDocument()
  })

  test('When clicked, should call onClick method', () => {
    const handleClick = jest.fn()
    const { container } = render(<Button onClick={handleClick}/>)

    fireEvent.click(container.firstChild)

    expect(handleClick).toHaveBeenCalled()
  })
})