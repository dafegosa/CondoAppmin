import axios from 'axios'
import { CONDO_SELECT_CLEAN } from './condoReducer'
import { LOGGED_ADMIN, LOGGED_RESIDENT } from './sessionReducer'

export const LOGIN_HANDLE_CHANGE = 'LOGIN_HANDLE_CHANGE'
export const SET_LOGIN_MESSAGE = 'SET_LOGIN_MESSAGE'
export const CLEAN_LOGIN = 'CLEAN_LOGIN'

export function userLogin(history, user, type) {
  return async function (dispatch) {
    try {
      const { data } = await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: `/${type}/signin`,
        data: user,
      })

      localStorage.setItem('token', data.token)
      if (type === 'admin') {
        dispatch({ type: LOGGED_ADMIN })
        dispatch({ type: CONDO_SELECT_CLEAN })
      } else {
        dispatch({ type: LOGGED_RESIDENT })
        dispatch({ type: CONDO_SELECT_CLEAN })
      }

      dispatch({ type: SET_LOGIN_MESSAGE, payload: 'Inicio de sesión exisoso' })
      history.push('/dashboard')
      dispatch({ type: CLEAN_LOGIN })
    } catch (err) {
      dispatch({
        type: SET_LOGIN_MESSAGE,
        payload: 'Usuario o contraseña inválida',
      })
    }
  }
}

const initialState = {
  email: '',
  password: '',
  type: '',
  message: '',
}

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_HANDLE_CHANGE:
      const { name, value } = action.payload
      return {
        ...state,
        [name]: value,
      }
    case SET_LOGIN_MESSAGE:
      return {
        ...state,
        message: action.payload,
      }
    case CLEAN_LOGIN:
      return {
        ...state,
        email: '',
        password: '',
        type: '',
        message: '',
      }
    default:
      return state
  }
}

export default loginReducer
