export const CREATE_MESSAGE = 'CREATE_MESSAGE'

const initialState = {
  from: '',
  to: '',
  subject: '',
  body: '',
  date: '',
  read: 'false',
}

function messageFormReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_MESSAGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
        date: getDate() + ' / ' + getHour(),
      }
    default:
      return state
  }
}

export const getDate = () => {
  const today = new Date()
  return (
    today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()
  )
}

const getHour = () => {
  const today = new Date()
  return today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
}
export default messageFormReducer
