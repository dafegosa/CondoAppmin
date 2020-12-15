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

      dispatch({ type: UNITS_RETRIEVE, payload: data.data })
    } catch (err) {}
  }
}

const initialState = {
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
    default:
      return state;
  }

}


export default residentReducer