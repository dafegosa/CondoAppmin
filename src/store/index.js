import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'
import messageReducer from './messageReducer'
import sessionReducer from './sessionReducer'

export function getUser(history) {
  return async function (dispatch) {

    const token = localStorage.getItem('token')

    try { 
      var getAdmin = await axios({
        method: 'GET',
        baseURL: 'http://localhost:8000',
        url: '/admin',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (err) {}

    try {
      var getResident = await axios({
        method: 'GET',
        baseURL: 'http://localhost:8000',
        url: '/resident',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (err) {}

      if (getAdmin) {
        dispatch({ type: 'loggedAdmin' })
        return {getAdmin, type: 'admin'}
        
      } else if (getResident) {
        dispatch({ type: 'loggedResident' })
        return {getResident, type: 'resident'}
    
      } else {
        localStorage.removeItem('token')
        history.push('/login')
      }
  }
}
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
      dispatch({ type: 'retrieveMessages', payload: data.data }) 
      return data.data
    } catch (err) {}
  }
}

const rootReducer = combineReducers({ sessionReducer, messageReducer })
const middlewares = applyMiddleware(thunk)

export default createStore(rootReducer, middlewares)
