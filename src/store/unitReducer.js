import axios from 'axios'

const UNIT_HANDLE_CHANGE = 'UNIT_HANDLE_CHANGE'
const UNIT_CREATE = 'UNIT_CREATE'
export const UNIT_FORM_CLEAN = 'UNIT_FORM_CLEAN'
export const UNIT_MESSAGE_CLEAN = 'UNIT_MESSAGE_CLEAN'
export const UNIT_MESSAGE_SET = 'UNIT_MESSAGE_SET'
export const UNIT_ERROR_CLEAN = 'UNIT_ERROR_CLEAN'
export const UNIT_ERROR_SET = 'UNIT_ERROR_SET'
export const UNIT_DELETE = 'UNIT_DELETE'
const UNITS_RETRIEVE = 'UNITS_RETRIEVE'

export function retrieveUnits(condoid) {
  return async function (dispatch) {

    dispatch({ type: UNIT_MESSAGE_SET, payload: 'loading units...'})

    const token = localStorage.getItem('token');
    try {
      const { data } = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: `/unit/${condoid}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      dispatch({ type: UNITS_RETRIEVE, payload: data.data })
    } catch (err) {
      dispatch({ type: UNIT_ERROR_SET, payload: err})
    }
  }
}

const initialState = {
  units: [],
  unitName: '',
  message: '',
  error: ''
}

function unitReducer(state = initialState, action) {

  switch (action.type) {
    case UNIT_HANDLE_CHANGE:
      const { name, value } = action.payload
      return {
        ...state,
        [name]: value
      }
    case UNIT_CREATE:
      return {
        ...state,
        message: action.payload
      }
    case UNIT_DELETE:
      return {
        ...state,
        units: action.payload
      }
    case UNITS_RETRIEVE:
      return {
        ...state,
        units: action.payload,
        message: ''
      }
    case UNIT_FORM_CLEAN:
      return {
        ...state,
        unitName: ''
      }
    case UNIT_MESSAGE_CLEAN:
      return {
        ...state,
        message: ''
      }
    case UNIT_MESSAGE_SET:
      return {
        ...state,
        message: action.payload
      }
    case UNIT_ERROR_CLEAN:
      return {
        ...state,
        error: ''
      }
    case UNIT_ERROR_SET:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }

}


export default unitReducer