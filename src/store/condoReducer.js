const CONDO_HANDLE_CHANGE = 'CONDO_HANDLE_CHANGE'
const CONDO_CREATE = 'CONDO_CREATE'


const initialState = {
  currentCondo: '5fd14b61f70bab3fe1f409c3',
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
        message: action.payload.message,
        currentCondo: action.payload.data._id,
      }
    default:
      return state;
  }

}


export default condoReducer