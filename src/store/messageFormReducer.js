export const CREATE_MESSAGE = 'CREATE_MESSAGE'
export const MESSAGE_SELECTED = 'MESSAGE_SELECTED'

const initialState = {
  from: '',
  to: '',
  subject: '',
  body: '',
  date: '',
  read: 'false',
  ticketState: 'true',
}

function messageFormReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_MESSAGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
        date: getDate() + ' / ' + getHour(),
      }
    case MESSAGE_SELECTED:
      const { from, to, subject, body, date } = action.payload.data
      return {
        ...state,
        from,
        to,
        subject,
        body,
        date,
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
