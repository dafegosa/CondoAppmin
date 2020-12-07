import axios from 'axios'
import { SIGNOUT } from './sessionReducer'
import { MESSAGE_SELECTED } from './messageFormReducer'

const RETRIEVE_MESSAGES = 'RETRIEVE_MESSAGES'

export function retrieveMessages(user, type) {
  return async function (dispatch) {
    const token = localStorage.getItem('token')

    try {
      const { data } = await axios({
        method: 'GET',
        baseURL: 'http://localhost:8000',
        url: `/${type}/${user}?read=false`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      dispatch({ type: RETRIEVE_MESSAGES, payload: data.data })
      return data.data
    } catch (err) {}
  }
}

function MessagesList(user, type) {
  return async function (dispatch) {
    const token = localStorage.getItem('token')

    try {
      const { data } = await axios({
        method: 'GET',
        baseURL: 'http://localhost:8000',
        url: `/${type}/${user}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      dispatch({ type: RETRIEVE_MESSAGES, payload: data.data })
      return data.data
    } catch (err) {}
  }
}

export function readMessage(id, route, messages, history) {
  return async function (dispatch) {
    const token = localStorage.getItem('token')

    axios({
      method: 'PUT',
      baseURL: 'http://localhost:8000',
      url: `/${route}/`,
      data: {
        _id: id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(({ data }) => {
        const unReadMessages = messages.filter((message) => {
          return message._id !== data.data._id
        })
        dispatch({ type: MESSAGE_SELECTED, payload: data })
        dispatch({ type: RETRIEVE_MESSAGES, payload: unReadMessages })
        history.push(`/dashboard/ticket/${data.data._id}`)
      })
      .catch((err) => err)
  }
}

const initialState = {
  messages: [],
  messagesList: [],
}

function messageReducer(state = initialState, action) {
  switch (action.type) {
    case RETRIEVE_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      }
    case SIGNOUT:
      return {
        ...state,
        messages: [],
      }
    case 'MESSAGE_LIST':
      return {
        ...state,

        messagesList: action.payload,
      }

    default:
      return state
  }
}

export default messageReducer
