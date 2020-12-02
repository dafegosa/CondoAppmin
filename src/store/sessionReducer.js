import axios from 'axios'

export const LOGGED_ADMIN = 'LOGGED_ADMIN'
export const LOGGED_RESIDENT = 'LOGGED_RESIDENT'
export const SIGNOUT = 'SIGNOUT'

export function signoutDispatch() {
  return {
    type: SIGNOUT,
  }
}

export function getUser(history) {
  return async function (dispatch) {
    const token = localStorage.getItem('token')

    try {
      var getAdmin = await axios({
        method: 'GET',
        baseURL: 'http://localhost:8000',
        url: '/admin',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (err) {}

    try {
      var getResident = await axios({
        method: 'GET',
        baseURL: 'http://localhost:8000',
        url: '/resident',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (err) {}

    if (getAdmin) {
      dispatch({ type: LOGGED_ADMIN })
      return { getAdmin, type: 'admin' }
    } else if (getResident) {
      dispatch({ type: LOGGED_RESIDENT })
      return { getResident, type: 'resident' }
    } else {
      localStorage.removeItem('token')
      history.push('/login')
    }
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
        admin: !state.admin,
      }
    case LOGGED_RESIDENT:
      return {
        ...state,
        resident: !state.resident,
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
