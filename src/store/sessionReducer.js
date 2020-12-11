import axios from 'axios'

export const LOGGED_ADMIN = 'LOGGED_ADMIN'
export const LOGGED_RESIDENT = 'LOGGED_RESIDENT'
export const SIGNOUT = 'SIGNOUT'

export function signoutDispatch() {
  return {
    type: SIGNOUT,
  }
}

export function verifyUser(history) {
  return async function (dispatch) {
    const token = localStorage.getItem('token')

    try {
      var getAdmin = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/admin',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log('en el try Admin', getAdmin)
    } catch (err) {}

    try {
      var getResident = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/resident/getResident',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log('en el try resident', getResident)
    } catch (err) {}

    if (getAdmin) {
      console.log('administrador')
      dispatch({ type: LOGGED_ADMIN })
      return { getAdmin, type: 'admin' }
    } else if (getResident) {
      console.log('Residente')
      dispatch({ type: LOGGED_RESIDENT })
      return { getResident, type: 'resident' }
    } else {
      localStorage.removeItem('token')
      history.push('/login')
    }
  }
}

export async function getAdmin() {
  const token = localStorage.getItem('token')

  try {
    const admin = await axios({
      method: 'GET',
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: '/admin',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return admin
  } catch (err) {
    return
  }
}

export function globalHandleChange(e, reducer) {
  return async function (dispatch) {
    const { name, value } = e.target
    const newState = {
      name,
      value,
    }
    dispatch({ type: `${reducer}_HANDLE_CHANGE`, payload: newState })
  }
}

export function globalCreateDocument(endpoint, document) {
  return async function (dispatch) {
    try {
      const token = localStorage.getItem('token')
      const { data } = await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: `/${endpoint}`,
        data: document,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      dispatch({
        type: `${endpoint.toUpperCase()}_CREATE`,
        payload: {
          data: data.data,
        },
      })
    } catch (err) {}
  }
}

const initialState = {
  admin: false,
  resident: false,
}

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case LOGGED_ADMIN:
      return {
        ...state,
        admin: true,
      }
    case LOGGED_RESIDENT:
      return {
        ...state,
        resident: true,
      }
    case SIGNOUT:
      return {
        ...state,
        admin: false,
        resident: false,
      }
    default:
      return state
  }
}

export default sessionReducer
