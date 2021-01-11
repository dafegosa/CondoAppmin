import { fireEvent, getByTestId, render, cleanup, act } from "@testing-library/react"
import '@testing-library/jest-dom'
import Register from "./Register"
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import store from '../../store'
import App from '../../App'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import moxios from 'moxios'

const middlewares  = [thunk]
const mockRegisterReducer = configureStore(middlewares)

describe('Sign Up form', () => {
  beforeEach(() => {
    moxios.install()
  })
  afterEach(() => {
    cleanup()
    moxios.uninstall()
  })

  const correctAdmin = {
    name: 'Alejandro',
    lastName: 'Alfaro',
    id: '1020769340',
    phone: '3502106375',
    email: 'alejo9226@gmail.com',
    password: '12345'
  }

  it('Ingresar button should redirect to Sign Up', async () => {

    const mockedStore = mockRegisterReducer({
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
    const registerLink = getByText(/Sign Up/)
    fireEvent.click(registerLink)
    expect(document.body.textContent).toMatch(/registrate para empezar/i)

    const goLoginLink = document.querySelector('.Login-link')
    fireEvent.click(goLoginLink)
    expect(document.body.textContent).toMatch(/.*?inicia sesión/i)
  })

  it('should change form fields and render success message on admin created', async () => {
    const successMessage = 'Cuenta creada exitosamente'

    const { getByLabelText, getByTestId, getByText, debug } = render(
      <Provider store={store} >
        <Router>
          <Switch>
            <Register />
          </Switch>
        </Router>
      </Provider>
    )
    const nameField =  getByLabelText('Nombre')
    fireEvent.change(nameField, { target: { value: correctAdmin.name } })
    expect(nameField.value).toBe(correctAdmin.name)

    const lastNameField =  getByLabelText('Apellido')
    fireEvent.change(lastNameField, { target: { value: correctAdmin.lastName } })
    expect(lastNameField.value).toBe(correctAdmin.lastName)

    const idField =  getByLabelText('Cédula')
    fireEvent.change(idField, { target: { value: correctAdmin.id } })
    expect(idField.value).toBe(correctAdmin.id)

    const phoneField =  getByLabelText('Teléfono')
    fireEvent.change(phoneField, { target: { value: correctAdmin.phone } })
    expect(phoneField.value).toBe(correctAdmin.phone)

    const emailField =  getByLabelText('Email')
    fireEvent.change(emailField, { target: { value: correctAdmin.email } })
    expect(emailField.value).toBe(correctAdmin.email)

    const passwordField =  getByLabelText('Contraseña')
    fireEvent.change(passwordField, { target: { value: correctAdmin.password } })
    expect(passwordField.value).toBe(correctAdmin.password)

    const registerForm = getByTestId('register')
    fireEvent.submit(registerForm)
    
    await moxios.wait(jest.fn)
    await act(async () => {
      const req = moxios.requests.mostRecent()
      req.respondWith({
        status: 201,
        response: {
          token: 'SKLDNFSKLJDFNSKDFJN',
          message: successMessage
        }
      })
    }) 
    
    const message = getByText(successMessage)
    expect(message.innerHTML).toMatch(successMessage)

  })
  it('should change form fields and render failure message on admin not created', async () => {
    const failureMessage = 'Algo salió mal'

    const { getByLabelText, getByTestId, getByText, debug } = render(
      <Provider store={store} >
        <Router>
          <Switch>
            <Register />
          </Switch>
        </Router>
      </Provider>
    )
    const nameField =  getByLabelText('Nombre')
    fireEvent.change(nameField, { target: { value: correctAdmin.name } })
    expect(nameField.value).toBe(correctAdmin.name)

    const lastNameField =  getByLabelText('Apellido')
    fireEvent.change(lastNameField, { target: { value: correctAdmin.lastName } })
    expect(lastNameField.value).toBe(correctAdmin.lastName)

    const idField =  getByLabelText('Cédula')
    fireEvent.change(idField, { target: { value: correctAdmin.id } })
    expect(idField.value).toBe(correctAdmin.id)

    const phoneField =  getByLabelText('Teléfono')
    fireEvent.change(phoneField, { target: { value: correctAdmin.phone } })
    expect(phoneField.value).toBe(correctAdmin.phone)

    const emailField =  getByLabelText('Email')
    fireEvent.change(emailField, { target: { value: correctAdmin.email } })
    expect(emailField.value).toBe(correctAdmin.email)

    const passwordField =  getByLabelText('Contraseña')
    fireEvent.change(passwordField, { target: { value: correctAdmin.password } })
    expect(passwordField.value).toBe(correctAdmin.password)

    const registerForm = getByTestId('register')
    fireEvent.submit(registerForm)
    
    await moxios.wait(jest.fn)
    await act(async () => {
      const req = moxios.requests.mostRecent()
      req.respondWith({
        status: 400,
        response: {
          message: failureMessage
        }
      })
    }) 
    
    const message = getByText(failureMessage)
    expect(message.innerHTML).toMatch(failureMessage)
  })

})