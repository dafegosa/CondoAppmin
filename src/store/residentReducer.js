
const RESIDENT_HANDLE_CHANGE = 'RESIDENT_HANDLE_CHANGE'
const RESIDENT_CREATE = 'RESIDENT_CREATE'


const initialState = {
  resName: '',
  resLastname: '',
  resIdNumber: '',
  resPhone: '',
  resEmail: '',
  resPassword: '',
  resUnit: '',
  message: ''
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