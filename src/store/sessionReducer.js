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
    } catch (err) {}

    try {
      var getResident = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
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
    console.log('condo', newState)
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
        payload: data.message,
      })
    } catch (err) {
      console.dir('error', err.body)
    }
  }
}
export function globalUpdateDocument(endpoint, documentId, updatedDocument, documents) {
  return async function (dispatch) {
    try {
      const token = localStorage.getItem('token')
      const { data } = await axios({
        method: 'PUT',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: `/${endpoint}/${documentId}`,
        data: updatedDocument,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
     
      dispatch({
        type: `${endpoint.toUpperCase()}_MESSAGE_SET`,
        payload: data.message
      })
      
    } catch (err) {
      dispatch({
        type: `${endpoint.toUpperCase()}_ERROR_SET`,
        payload: err.response.data.message
      })
    }
  }
}
export function globalRemoveDocument(endpoint, documentid, documents = null) {
  return async function (dispatch) {
    try {
      const token = localStorage.getItem('token')
      const response = await axios({
        method: 'DELETE',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: `/${endpoint}/${documentid}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const filteredDocuments = documents.filter(unit => {
        return unit._id !== documentid
      })
      dispatch({
        type: `${endpoint.toUpperCase()}_DELETE`,
        payload: filteredDocuments,
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
