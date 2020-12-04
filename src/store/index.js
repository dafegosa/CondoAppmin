import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import loginReducer from './loginReducer'
import signupReducer from './signupReducer'
import sessionReducer from './sessionReducer'
import condoReducer from './condoReducer'
import unitReducer from './unitReducer'
import residentReducer from './residentReducer'
import messageReducer from './messageReducer'
import messageFormReducer from './messageFormReducer'

const rootReducer = combineReducers({
  loginReducer,
  signupReducer,
  sessionReducer,
  condoReducer,
  unitReducer,
  residentReducer,
  messageReducer,
  messageFormReducer,
})
const middlewares = applyMiddleware(thunk)

export default createStore(rootReducer, middlewares)
