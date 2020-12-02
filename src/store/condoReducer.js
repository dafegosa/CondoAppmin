import axios from 'axios'

const CONDO_HANDLE_CHANGE = 'CONDO_HANDLE_CHANGE'
const CONDO_CREATE = 'CONDO_CREATE'


const initialState = {
  currentCondo: '5fbf0d24416bf74cec063c6e',
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
        message: action.payload
      }
    default:
      return state;
  }

}


export default condoReducer