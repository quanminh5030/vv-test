import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders content', () => {
  render(<App />)
  const element = screen.getByText('VV-TEST')

  screen.debug(element)


  // expect(element).toBeDefined()
})
