export const CREATE_MESSAGE = 'CREATE_MESSAGE'
export const MESSAGE_SELECTED = 'MESSAGE_SELECTED'
export const ID_TICKET_SELECTED = 'ID_TICKET_SELECTED'
export const CHANGE_TICKET_STATE = 'CHANGE_TICKET_STATE'
export const CREATE_SUBTICKET = 'CREATE_SUBTICKET'

const initialState = {
  from: '',
  to: '',
  subject: '',
  body: '',
  date: '',
  read: 'false',
  ticketState: 'true',
  thisId: '',
  subBody: '',
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
      const { from, to, subject, body, date, ticketState } = action.payload.data
      return {
        ...state,
        from,
        to,
        subject,
        body,
        date,
        ticketState,
      }
    case ID_TICKET_SELECTED:
      console.log('Está llegando esta mierda', action.payload)
      return {
        ...state,
        thisId: action.payload,
      }
    case CHANGE_TICKET_STATE:
      return {
        ...state,
        ticketState: false,
      }
    case CREATE_SUBTICKET:
      return {
        ...state,
        subBody: action.payload.value,
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
