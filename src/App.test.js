import { getByTestId, render } from "@testing-library/react"
import '@testing-library/jest-dom'
import App from './App'

describe('Testear el app', () => {
  it('should render Sign Up button', () => {
    const { getByTestId } = render(<App />)
    const register =  getByTestId('register-button')
  
    expect(register).toBeInTheDocument()
    expect(register.innerHTML).toMatch(/Sign Up/)
  })
  it('should render Login button', () => {
    const { getByTestId } = render(<App />)
    const login =  getByTestId('login-button')
  
    expect(login).toBeInTheDocument()
    expect(login.innerHTML).toMatch(/Login/)
  })
})