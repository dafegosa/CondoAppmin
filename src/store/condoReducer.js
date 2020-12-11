import axios from 'axios'

export const CONDO_HANDLE_CHANGE = 'CONDO_HANDLE_CHANGE'
export const CONDO_CREATE = 'CONDO_CREATE'
export const CONDOS_RETRIEVE = 'CONDOS_RETRIEVE'
export const CONDO_FORM_CLEAN = 'CONDO_FORM_CLEAN'
export const CONDO_MESSAGE_CLEAN = 'CONDO_MESSAGE_CLEAN'

export function getCondos () {
  return async function (dispatch) {

    const token = localStorage.getItem('token')
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
        payload: data.data
      })
    } catch (err) {
      console.dir(err)
    }
    
  }
}

const initialState = {
  currentCondo: '',
  condos: [],
  condoName: '',
  condoAddress: '',
  message: ''
}

function condoReducer(state = initialState, action) {
  switch (action.type) {
    case CONDO_HANDLE_CHANGE:
      const { name, value } = action.payload
      return {
        ...state,
        [name]: value
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
    case CONDO_FORM_CLEAN:
      return {
        ...state,
        condoName: '',
        condoAddress: '',
      }
    case CONDO_MESSAGE_CLEAN:
      return {
        ...state,
        message: '',
      }
    default:
      return state;
  }

}


export default condoReducer