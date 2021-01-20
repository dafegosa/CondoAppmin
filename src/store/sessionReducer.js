import axios from 'axios'
import { CONDO_SELECT, CONDO_SELECT_CLEAN } from './condoReducer'
import { MESSAGE_LIST_CLEAN } from './messageReducer'

export const LOGGED_ADMIN = 'LOGGED_ADMIN'
export const LOGGED_RESIDENT = 'LOGGED_RESIDENT'
export const SIGNOUT = 'SIGNOUT'
export const SET_CURRENT_OPTION = 'SET_CURRENT_OPTION'

export function signoutDispatch() {
  return function (dispatch) {
    dispatch({ type: SIGNOUT })
    dispatch({ type: CONDO_SELECT_CLEAN })
    dispatch({ type: MESSAGE_LIST_CLEAN })
  }
}

export function verifyUser(history, token) {
  return async function (dispatch) {
    try {
      var getAdmin = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/admin',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      dispatch({ type: LOGGED_ADMIN })
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
      dispatch({ type: LOGGED_RESIDENT })
    } catch (err) {}

    dispatch({ type: MESSAGE_LIST_CLEAN })

    if (getAdmin) {
      return { getAdmin, type: 'admin' }
    } else if (getResident) {
      dispatch({
        type: CONDO_SELECT,
        payload: {
          id: getResident.data.condoId,
          condoName: getResident.data.condoName,
        },
      })
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

export function globalCreateDocument(endpoint, document, token) {
  return async function (dispatch) {
    try {
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
    } catch (err) {}
  }
}
export function globalUpdateDocument(
  endpoint,
  documentId,
  updatedDocument,
  documents
) {
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
        payload: data.message,
      })
    } catch (err) {
      dispatch({
        type: `${endpoint.toUpperCase()}_ERROR_SET`,
        payload: err.response.data.message,
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

      const filteredDocuments = documents.filter((document) => {
        return document._id !== documentid
      })
      dispatch({
        type: `${endpoint.toUpperCase()}_DELETE`,
        payload: filteredDocuments,
      })
    } catch (err) {}
  }
}

export const initialState = {
  admin: false,
  resident: false,
  currentOption: '',
}

export function sessionReducer(state = initialState, action) {
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
    case SET_CURRENT_OPTION:
      return {
        ...state,
        currentOption: action.payload,
      }
    default:
      return state
  }
}

export default sessionReducer
