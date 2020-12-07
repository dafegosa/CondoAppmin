import axios from 'axios'

export const SIGNUP_HANDLE_CHANGE = 'SIGNUP_HANDLE_CHANGE'
export const SET_SIGNUP_MESSAGE = 'SET_SIGNUP_MESSAGE'
export const CLEAN_SIGNUP = 'CLEAN_SIGNUP'

export function userSignup(newUser) {
  return async function (dispatch) {
    
    try {
      const createdUser = await axios({
        method: 'POST',
        baseURL: 'http://localhost:8000',
        url: '/admin/signup',
        data: newUser,
      })
      dispatch({ type: SET_SIGNUP_MESSAGE, payload: 'Cuenta creada exitosamente' })
      dispatch({ type: CLEAN_SIGNUP })

    } catch (err) {
      dispatch({ type: SET_SIGNUP_MESSAGE, payload: 'Algo salió mal' })
    } 
  }
}

const initialState = {
  name: '',
  lastname: '',
  idnumber: '',
  phone: '',
  email: '',
  password: '',
  message: '',
}

function signupReducer(state = initialState, action) {

  switch (action.type) {
    case SIGNUP_HANDLE_CHANGE:
      const { name, value } = action.payload
      return {
        ...state,
        [name]: value
      }
    case SET_SIGNUP_MESSAGE:
      return {
        ...state,
        message: action.payload
      }
    case CLEAN_SIGNUP:
      return {
        ...state,
        name: '',
        lastname: '',
        idnumber: '',
        phone: '',
        email: '',
        password: '',
      }
    default:
      return state;
  }

}


export default signupReducer