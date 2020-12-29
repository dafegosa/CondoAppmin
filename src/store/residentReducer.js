import axios from 'axios'
const RESIDENT_HANDLE_CHANGE = 'RESIDENT_HANDLE_CHANGE'
const RESIDENT_CREATE = 'RESIDENT_CREATE'
export const RESIDENT_FORM_CLEAN = 'RESIDENT_FORM_CLEAN'
export const RESIDENT_MESSAGE_CLEAN = 'RESIDENT_MESSAGE_CLEAN'
export const RESIDENT_MESSAGE_SET = 'RESIDENT_MESSAGE_SET'
export const RESIDENT_ERROR_CLEAN = 'RESIDENT_ERROR_CLEAN'
export const RESIDENT_ERROR_SET = 'RESIDENT_ERROR_SET'
export const RESIDENT_DELETE = 'RESIDENT_DELETE'
const RESIDENTS_RETRIEVE = 'RESIDENTS_RETRIEVE'
export const SET_CURRENT_RESIDENT_ID = 'SET_CURRENT_RESIDENT_ID'
export const SET_CURRENT_RESIDENT_NAME = 'SET_CURRENT_RESIDENT_NAME'
export const SET_CURRENT_RESIDENT = 'SET_CURRENT_RESIDENT'

export function retrieveResidents(condoid) {
  return async function (dispatch) {

    const token = localStorage.getItem('token');
    try {
      const { data } = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: `/resident/${condoid}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      dispatch({ type: RESIDENTS_RETRIEVE, payload: data.data })
    } catch (err) {}
  }
}
export function retrieveSingleResident (residentId) {
  return async function (dispatch) {

    const token = localStorage.getItem('token');
    try {
      const { data } = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: `/resident/single/${residentId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      dispatch({ type: SET_CURRENT_RESIDENT, payload: data.data[0] })
    } catch (err) {
      dispatch({ type: RESIDENT_ERROR_SET, payload: err})
    }
  }
}

const initialState = {
  currentResidentId: '',
  currentResidentName: '',
  currentResident: {},
  residents: [],
  resName: '',
  resLastname: '',
  resIdNumber: '',
  resPhone: '',
  resEmail: '',
  resPassword: '',
  resUnit: '',
  message: '',
  error: ''
}

function residentReducer(state = initialState, action) {

  switch (action.type) {
    case RESIDENT_HANDLE_CHANGE:
      const { name, value } = action.payload
      return {
        ...state,
        [name]: value
      }
    case RESIDENT_CREATE:
      return {
        ...state,
        message: action.payload
      }
    case RESIDENTS_RETRIEVE:
      return {
        ...state,
        residents: action.payload
      }
    case RESIDENT_FORM_CLEAN:
      return {
        ...state,
        resName: '',
        resLastname: '',
        resIdNumber: '',
        resPhone: '',
        resEmail: '',
        resPassword: '',
        resUnit: ''
      }
    case RESIDENT_MESSAGE_CLEAN:
      return {
        ...state,
        message: '',
      }
    case RESIDENT_MESSAGE_SET:
      return {
        ...state,
        message: action.payload,
      }
    case RESIDENT_ERROR_SET:
      return {
        ...state,
        error: action.payload
      }
    case SET_CURRENT_RESIDENT_ID:
      return {
        ...state,
        currentResidentId: action.payload
      }
    case SET_CURRENT_RESIDENT_NAME:
      return {
        ...state,
        currentResidentName: action.payload
      }
    case SET_CURRENT_RESIDENT:
      return {
        ...state,
        currentResident: action.payload
      }
    default:
      return state;
  }

}


export default residentReducer