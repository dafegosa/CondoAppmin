import axios from 'axios'

const UNIT_HANDLE_CHANGE = 'UNIT_HANDLE_CHANGE'
const UNIT_CREATE = 'UNIT_CREATE'
const GET_UNITS = 'GET_UNITS'

export function retrieveUnits(condoid) {
  return async function (dispatch) {

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

      dispatch({ type: GET_UNITS, payload: data.data })
    } catch (err) {}
  }
}

const initialState = {
  units: [],
  unitName: '',
  message: ''
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
    case GET_UNITS:
      return {
        ...state,
        units: action.payload
      }
    default:
      return state;
  }

}


export default unitReducer