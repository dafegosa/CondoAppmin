import axios from 'axios'

export const CONDO_HANDLE_CHANGE = 'CONDO_HANDLE_CHANGE'
export const CONDO_CREATE = 'CONDO_CREATE'
export const CONDOS_RETRIEVE = 'CONDOS_RETRIEVE'
export const CONDO_SELECT = 'CONDO_SELECT'
export const CONDO_SELECT_CLEAN = 'CONDO_SELECT_CLEAN'
export const CONDO_FORM_CLEAN = 'CONDO_FORM_CLEAN'
export const CONDO_DELETE = 'CONDO_DELETE'
export const CONDO_MESSAGE_CLEAN = 'CONDO_MESSAGE_CLEAN'
export const CONDO_MESSAGE_SET = 'CONDO_MESSAGE_SET'
export const CONDO_ERROR_CLEAN = 'CONDO_ERROR_CLEAN'
export const CONDO_ERROR_SET = 'CONDO_ERROR_SET'
export const CHOSEN_CONDO_CLEAN = 'CHOSEN_CONDO_CLEAN'

export function getCondos(token) {
  return async function (dispatch) {
     try {
      const { data } = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/condo',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      dispatch({
        type: CONDOS_RETRIEVE,
        payload: data.data,
      })

    } catch (err) {
      dispatch({ type: CONDO_ERROR_SET, payload: err.response.data.message })
    }
  }
}

const initialState = {
  chosenCondo: '',
  currentCondoId: '',
  currentCondoName: '',
  condos: [],
  condoName: '',
  condoAddress: '',
  error: '',
  message: '',
}

function condoReducer(state = initialState, action) {
  switch (action.type) {
    case CONDO_HANDLE_CHANGE:
      const { name, value } = action.payload
      return {
        ...state,
        [name]: value,
      }
    case CONDO_CREATE:
      return {
        ...state,
        message: action.payload,
      }
    case CONDOS_RETRIEVE:
      return {
        ...state,
        condos: [...action.payload],
      }
    case CONDO_SELECT:
      const { id, condoName } = action.payload
      return {
        ...state,
        currentCondoId: id,
        currentCondoName: condoName,
      }
    case CONDO_SELECT_CLEAN:
      return {
        ...state,
        currentCondoId: '',
        currentCondoName: '',
      }
    case CONDO_FORM_CLEAN:
      return {
        ...state,
        condoName: '',
        condoAddress: '',
      }
    case CONDO_DELETE:
      return {
        ...state,
        condos: action.payload,
      }
    case CONDO_MESSAGE_CLEAN:
      return {
        ...state,
        message: '',
      }
    case CONDO_MESSAGE_SET:
      return {
        ...state,
        message: action.payload,
      }
    case CONDO_ERROR_CLEAN:
      return {
        ...state,
        error: '',
      }
    case CONDO_ERROR_SET:
      return {
        ...state,
        error: action.payload,
      }
    case CHOSEN_CONDO_CLEAN:
      return {
        chosenCondo: ''
      }
    default:
      return state
  }
}

export default condoReducer
