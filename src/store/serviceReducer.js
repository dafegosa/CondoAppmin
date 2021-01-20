export const SERVICE_FORM_CLEAN = 'SERVICE_FORM_CLEAN'
export const SERVICE_CREATE = 'SERVICE_CREATE'
export const SERVICE_HANDLE_CHANGE = 'SERVICE_HANDLE_CHANGE'

const initialState = {
  settings: [],
  name: '', 
  value: 0, 
  message: '', 
  error: ''
}

function serviceReducer(state = initialState, action) {
  switch (action.type) {
    case SERVICE_HANDLE_CHANGE:
      const { name, value } = action.payload
      return {
        ...state,
        [name]: value
      }
    case SERVICE_CREATE:
      return {
        ...state,
        message: action.payload
      }
    default:
      return state;
    
  }
}

export default paymentReducer