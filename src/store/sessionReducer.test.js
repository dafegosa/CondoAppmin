import { signoutDispatch, SIGNOUT } from './sessionReducer'
import { cleanup } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'


const middlewares  = [thunk]
const mockSessionReducer = configureStore(middlewares)

describe('Session reducer', () => {
  beforeEach(() => {
    moxios.install()
  })
  afterEach(() => {
    moxios.uninstall()
    cleanup()
  })

  it('should trigger SIGNOUT', () => {

    const { dispatch, getActions } = mockSessionReducer()
    
    signoutDispatch()(dispatch)
    const actions = getActions()
    expect(actions[0].type).toBe(SIGNOUT)
  })
  
})
