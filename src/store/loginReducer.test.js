import { cleanup } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'
import { CLEAN_LOGIN, SET_LOGIN_MESSAGE, userLogin } from './loginReducer' 
import { LOGGED_ADMIN, LOGGED_RESIDENT } from './sessionReducer'
import { CONDO_SELECT_CLEAN } from './condoReducer'

const middlewares  = [thunk]
const mockLoginReducer = configureStore(middlewares)

describe('Login reducer', () => {
  beforeEach(() => {
    moxios.install()
  })
  afterEach(() => {
    moxios.uninstall()
  })

  const token = 'SODJVBSDJVBLSJDVBJL'

  it('should trigger LOGGED_ADMIN on admin login successful', async () => {

    const currentUserType = 'admin'
    const currentUser = {
    email: 'alejo9226@gmail.com',
    password: '12345'
    }
    const { dispatch, getActions } = mockLoginReducer()
    const history = {
      push: jest.fn()
    } 
    
    userLogin(history, currentUser, currentUserType)(dispatch)

    await moxios.wait(jest.fn)
    const req = moxios.requests.mostRecent()
    await req.respondWith({
      status: 200,
      response: {
        token,
        name: 'Alejandro'
      }
    })

    const actions = getActions()

    expect(history.push).toHaveBeenCalledWith('/dashboard')
    expect(actions[0].type).toBe(LOGGED_ADMIN)
  })

  it('should trigger LOGGED_RESIDENT on resident login successful', async () => {

    const currentUserType = 'resident'
    const currentUser = {
    email: 'alejo@test.com',
    password: '12345'
    }
    const { dispatch, getActions } = mockLoginReducer()
    const history = {
      push: jest.fn()
    } 
    
    userLogin(history, currentUser, currentUserType)(dispatch)

    await moxios.wait(jest.fn)
    const req = moxios.requests.mostRecent()
    await req.respondWith({
      status: 200,
      response: {
        token,
        name: 'Alejandro'
      }
    })

    const actions = getActions()

    expect(history.push).toHaveBeenCalledWith('/dashboard')
    expect(actions[0].type).toBe(LOGGED_RESIDENT)
  })
})
