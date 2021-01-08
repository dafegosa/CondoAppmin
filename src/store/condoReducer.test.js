import { cleanup } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'
import { CLEAN_LOGIN, SET_LOGIN_MESSAGE, userLogin } from './loginReducer' 
import { LOGGED_ADMIN, LOGGED_RESIDENT } from './sessionReducer'
import { CONDOS_RETRIEVE, CONDO_ERROR_SET, CONDO_SELECT_CLEAN, getCondos } from './condoReducer'

const middlewares  = [thunk]
const mockCondoReducer = configureStore(middlewares)

const condominios = [
  {
    _id: 1,
    name: 'name 1',
    address: 'address 1',
    unitIds: [1, 2, 3],
    residentIds: [1, 2]
  },
  {
    _id: 2,
    name: 'name 2',
    address: 'address 2',
    unitIds: [],
    residentIds: []
  },
  {
    _id: 3,
    name: 'name 3',
    address: 'address 3',
    unitIds: [],
    residentIds: []
  },
]

describe('Condo reducer', () => {
  beforeEach(() => {
    moxios.install()
  })
  afterEach(() => {
    moxios.uninstall()
  })

  const token = 'SODJVBSDJVBLSJDVBJL'

  it('should trigger CONDOS_RETRIEVE', async () => {

    const { dispatch, getActions } = mockCondoReducer()
    
    getCondos(token)(dispatch)

    await moxios.wait(jest.fn)
    const req = moxios.requests.mostRecent()
    await req.respondWith({
      status: 200,
      response: {
        data: {
          message: 'Condos found',
          data: condominios
        }
      }
    })

    const actions = getActions()
    expect(actions[0].type).toBe(CONDOS_RETRIEVE)
  })
  it('should trigger CONDO_ERROR_SET', async () => {

    const { dispatch, getActions } = mockCondoReducer()
    const failureMessage = 'Condos could not be found'
    
    getCondos(token)(dispatch)

    await moxios.wait(jest.fn)
    const req = moxios.requests.mostRecent()
    await req.respondWith({
      status: 400,
      response: {
        message: failureMessage,
      }
    })

    const actions = getActions()
    expect(actions[0].type).toBe(CONDO_ERROR_SET)
  })
})