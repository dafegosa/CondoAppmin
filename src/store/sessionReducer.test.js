import { signoutDispatch, SIGNOUT, verifyUser, LOGGED_ADMIN, LOGGED_RESIDENT, globalCreateDocument, globalUpdateDocument, globalRemoveDocument, sessionReducer, initialState, SET_CURRENT_OPTION, getAdmin } from './sessionReducer'
import { cleanup } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'


const middlewares  = [thunk]
const mockSessionReducer = configureStore(middlewares)

const token = "ALSJFHAKJDFNALJF"

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
    location: {
      pathname: '/dashboard'
    }
  }),
}))

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
  
  it('should trigger LOGGED_ADMIN once the user is an admin', async () => {

    const history = {
      push: jest.fn()
    }

    const { dispatch, getActions } = mockSessionReducer()

    verifyUser(history, token)(dispatch)

    await moxios.wait(jest.fn)
    const req = moxios.requests.mostRecent()
    await req.respondWith({
      status: 200,
      response: {
        message: 'admin found',
        name: 'Alejandro',
        id: '12334',
        email: 'alejo@test.com'
      }
    })

    const actions = getActions()
    expect(actions[0].type).toBe(LOGGED_ADMIN)
  })
  it('should trigger ANY_CREATE action on any object creation', async () => {
    
    const objectType = 'condo'
    const object = {
      name: 'ICATA IV',
      address: '5th Avenue',
      admin: '11793476293874'
    }
    const { dispatch, getActions } = mockSessionReducer()

    globalCreateDocument(objectType, object, token)(dispatch)

    await moxios.wait(jest.fn)
    const req = moxios.requests.mostRecent()
    await req.respondWith({
      status: 200,
      response: {
        message: `${objectType.charAt(0).toUpperCase}${objectType.substr(1)} created`,
        [objectType]: object
      }
    })

    const actions = getActions()
    expect(actions[0].type).toBe(`${objectType.toUpperCase()}_CREATE`)
    expect(actions[0].payload).toMatch(`${objectType.charAt(0).toUpperCase}${objectType.substr(1)} created`)
  })

  it('should trigger ANY_MESSAGE_SET action on any object update', async () => {
    
    const objectType = 'condo'
    const objectId = '1827365454677'
    const object = {
      name: 'ICATA IV',
      address: '5th Avenue',
      admin: '11793476293874'
    }
    const { dispatch, getActions } = mockSessionReducer()

    globalUpdateDocument(objectType, objectId, object)(dispatch)

    await moxios.wait(jest.fn)
    const req = moxios.requests.mostRecent()
    await req.respondWith({
      status: 200,
      response: {
        message: `${objectType.charAt(0).toUpperCase}${objectType.substr(1)} updated`,
        [objectType]: object
      }
    })

    const actions = getActions()

    expect(actions[0].type).toBe(`${objectType.toUpperCase()}_MESSAGE_SET`)
    expect(actions[0].payload).toMatch(`${objectType.charAt(0).toUpperCase}${objectType.substr(1)} updated`)
  })

  it('should trigger ANY_ERROR_SET action on any failure to update any object', async () => {
    
    const objectType = 'condo'
    const objectId = '1827365454677'
    const object = {
      name: 'ICATA IV',
      address: '5th Avenue',
      admin: '11793476293874'
    }
    const { dispatch, getActions } = mockSessionReducer()

    globalUpdateDocument(objectType, objectId, object)(dispatch)

    await moxios.wait(jest.fn)
    const req = moxios.requests.mostRecent()
    await req.respondWith({
      status: 400,
      response: {
        message: `${objectType.charAt(0).toUpperCase}${objectType.substr(1)} could not be updated`,
      }
    })

    const actions = getActions()

    expect(actions[0].type).toBe(`${objectType.toUpperCase()}_ERROR_SET`)
    expect(actions[0].payload).toMatch(`${objectType.charAt(0).toUpperCase}${objectType.substr(1)} could not be updated`)
  })

  it('should trigger ANY_DELETE action on any object deletion', async () => {
    
    const objectType = 'condo'

    const objects = [
      {
        _id: '001',
        name: 'ICATA IV',
        address: '5th Avenue',
        admin: '11793476293874'
      },
      {
        _id: '002',
        name: 'ICATA III',
        address: '4th Avenue',
        admin: '11793333293874'
      },
      {
        _id: '003',
        name: 'ICATA II',
        address: '3th Avenue',
        admin: '11793334293874'
      },
    ]
    const filteredObjects = [
      {
        _id: '002',
        name: 'ICATA III',
        address: '4th Avenue',
        admin: '11793333293874'
      },
      {
        _id: '003',
        name: 'ICATA II',
        address: '3th Avenue',
        admin: '11793334293874'
      },
    ]
    const { dispatch, getActions } = mockSessionReducer()

    globalRemoveDocument(objectType, objects[0]._id, objects)(dispatch)

    await moxios.wait(jest.fn)
    const req = moxios.requests.mostRecent()
    await req.respondWith({
      status: 200,
      response: {
        message: `${objectType.charAt(0).toUpperCase}${objectType.substr(1)} deleted`,
        [objectType]: objects[0]
      }
    })

    const actions = getActions()

    expect(actions[0].type).toBe(`${objectType.toUpperCase()}_DELETE`)
    expect(actions[0].payload).toMatchObject(filteredObjects)
  })

  it('should return an admin when on successful response', async () => {
    const { dispatch, getActions } = mockSessionReducer()

    const admin = getAdmin()
    const { response } = admin

    await moxios.wait(jest.fn)
    const req = moxios.requests.mostRecent()
    await req.respondWith({
      status: 200,
      response: {
        message: 'admin found',
        name: 'Alejandro',
        id: '12334',
        email: 'alejo@test.com'
      }
    })
    expect(Object.keys((await admin).data).length).toBeGreaterThan(0)
  })

  it('should return initialState by default if invalid action', () => {
      const state = sessionReducer(undefined, { type: 'INVALID' })
      expect(state).toMatchObject(initialState)
  })

  it('should return resident: true on LOGGED_RESIDENT action', () => {
      const state = sessionReducer(undefined, { type: LOGGED_RESIDENT })
      expect(state.resident).toBeTruthy()
  })
  it('should return admin: true on LOGGED_ADMIN action', () => {
      const state = sessionReducer(undefined, { type: LOGGED_ADMIN })
      expect(state.admin).toBeTruthy()
  })
  it('should return falsy user types on SIGNOUT action', () => {
      const state = sessionReducer(undefined, { type: SIGNOUT })
      expect(state.admin).toBeFalsy()
      expect(state.resident).toBeFalsy()
  })
  it('should return currentOption filled with payload on SET_CURRENT_OPTION action', () => {
      const selectedOption = 'condo'
      const state = sessionReducer(undefined, { type: SET_CURRENT_OPTION, payload: selectedOption })
      expect(state.currentOption).toMatch(selectedOption)
  })
})
