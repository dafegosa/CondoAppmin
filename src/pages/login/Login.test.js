import { fireEvent, render, cleanup, act, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import Login from "./Login"
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import store from '../../store'
import { BrowserRouter as Router, MemoryRouter, Route, Switch, useHistory } from 'react-router-dom'
import moxios from 'moxios'
import App from "../../App"

const middlewares  = [thunk]
const mockLoginReducer = configureStore(middlewares)

describe('Login form', () => {
  beforeEach(() => {
    cleanup()
    moxios.install()
    localStorage.removeItem('token')
  })
  afterEach(() => {
    cleanup()
    moxios.uninstall()
  })
  
  const token = 'SKLDNFSKLJDFNSKDFJN'
  const currentUser = {
    type: 'admin',
    name: 'Alejandro',
    lastName: 'Alfaro',
    id: '1020769340',
    phone: '3502106375',
    email: 'alejo9226@gmail.com',
    password: '12345'
  }
  it('Registrarme button should redirect to Sign Up', async () => {

    const mockedStore = mockLoginReducer({
      loginReducer: {
        email: '',
        password: '',
        type: '',
        message: ''
      },
      signupReducer: {
        name: '',
        lastName: '',
        idnumber: '',
        phone: '',
        email: '',
        password: '',
        message: ''
      }
      
    })

    const { getByText } = render(
      <Provider store={mockedStore}>
        <App />
      </Provider>
    )
    const loginLink = getByText(/Login/)
    fireEvent.click(loginLink)
    expect(document.body.textContent).toMatch(/.*?inicia sesión/i)

    const goRegisterLink = document.querySelector('.Register-link')
    fireEvent.click(goRegisterLink)
    expect(document.body.textContent).toMatch(/registrate para empezar/i)

  })
 
  it('should change form fields, and install a token on login success', async () => {
  
    const { getByLabelText, getByTestId, getByText, debug } = render(
      <Provider store={store} >
        <Router>
          <Login />
        </Router>
      </Provider>
    )

    const adminRadioField = getByLabelText('Administrador')
    fireEvent.change(adminRadioField, { target: { value: currentUser.type } })
    expect(adminRadioField.value).toBe(currentUser.type)  

    const emailField =  getByLabelText('Email')
    fireEvent.change(emailField, { target: { value: currentUser.email } })
    expect(emailField.value).toBe(currentUser.email)

    const passwordField =  getByLabelText('Contraseña')
    fireEvent.change(passwordField, { target: { value: currentUser.password } })
    expect(passwordField.value).toBe(currentUser.password)

    const loginForm = getByTestId('login')
    fireEvent.submit(loginForm)

    await moxios.wait(jest.fn)
    await act(async () => {
      const req = moxios.requests.mostRecent()
      req.respondWith({
        status: 200,
        response: {
          token,
          name: currentUser.name
        }
      })
    }) 
    const currentToken = localStorage.getItem('token')
    expect(currentToken).toMatch(token)
    expect(document.location.href).toMatch(/dashboard/i)
  })

  it('should change form fields and show failure message', async () => {
    const failureMessage = 'Usuario o contraseña invalida'

    const { getByLabelText, getByTestId, getByText } = render(
      <Provider store={store} >
        <Router>
          <Login />
        </Router>
      </Provider>
    )
    
    const residentRadioField = getByLabelText('Residente')
    fireEvent.change(residentRadioField, { target: { value: 'resident' } })
    expect(residentRadioField.value).toBe('resident')  

    const adminRadioField = getByLabelText('Administrador')
    fireEvent.change(adminRadioField, { target: { value: currentUser.type } })
    expect(adminRadioField.value).toBe(currentUser.type)  
    
    const emailField =  getByLabelText('Email')
    fireEvent.change(emailField, { target: { value: currentUser.email } })
    expect(emailField.value).toBe(currentUser.email)

    const passwordField =  getByLabelText('Contraseña')
    fireEvent.change(passwordField, { target: { value: currentUser.password } })
    expect(passwordField.value).toBe(currentUser.password)

    const loginForm = getByTestId('login')
    fireEvent.submit(loginForm)

    await moxios.wait(jest.fn)
    await act(async () => {
      const req = moxios.requests.mostRecent()
      req.respondWith({
        status: 401,
        response: {
          message: failureMessage,
        }
      })
    }) 
    const currentToken = localStorage.getItem('token')
    expect(currentToken).toBeFalsy()

    const message = getByText(failureMessage)
    expect(message.innerHTML).toBe(failureMessage)
  })

})