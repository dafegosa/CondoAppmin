import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const initialState = {
  adminid: '',
  residentid: ''
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'loggedAdmin':
      return {
        ...state,
        adminid: action.payload
      }
    case 'loggedResident':
      return {
        ...state,
        residentid: action.payload
      }
    default:
      return state;
  }

}

export default createStore(reducer, initialState)