import axios from 'axios'
import { SIGNOUT } from './sessionReducer'
import { MESSAGE_SELECTED } from './messageFormReducer'

const RETRIEVE_MESSAGES = 'RETRIEVE_MESSAGES'
const MESSAGE_LIST = 'MESSAGE_LIST'

export function retrieveMessages(user, type, query = '') {
  return async function (dispatch) {
    const token = localStorage.getItem('token')
    try {
      const { data } = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: `/${type}/${user}${query}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      !query
        ? dispatch({ type: MESSAGE_LIST, payload: data.data })
        : dispatch({ type: RETRIEVE_MESSAGES, payload: data.data })
      return data.data
    } catch (err) {
      console.dir(err)
    }
  }
}

function MessagesList(user, type) {
  return async function (dispatch) {
    const token = localStorage.getItem('token')

    try {
      const { data } = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
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
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: `/${route}/`,
      data: {
        _id: id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(({ data }) => {
        console.log('putoo', data)
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

export function selectedTicket(id, history) {
  return async function (dispatch) {
    const token = localStorage.getItem('token')
    axios({
      method: 'put',
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: `/ticket/selected`,
      data: {
        _id: id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(({ data }) => {
        dispatch({ type: MESSAGE_SELECTED, payload: data })
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
    case MESSAGE_LIST:
      return {
        ...state,
        messagesList: action.payload,
      }

    default:
      return state
  }
}

export default messageReducer
