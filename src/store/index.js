import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'
import sessionReducer from './sessionReducer'
import condoReducer from './condoReducer'
import unitReducer from './unitReducer'
import residentReducer from './residentReducer'
import messageReducer from './messageReducer'

const rootReducer = combineReducers({
  sessionReducer,
  condoReducer,
  unitReducer,
  residentReducer,
  messageReducer,
})
const middlewares = applyMiddleware(thunk)

export default createStore(rootReducer, middlewares)
