import axios from 'axios'
export const PAYMENT_FORM_CLEAN = 'PAYMENT_FORM_CLEAN'
export const PAYMENT_CREATE = 'PAYMENT_CREATE'
export const PAYMENT_HANDLE_CHANGE = 'PAYMENT_HANDLE_CHANGE'
export const PAYMENTS_RETRIEVE = 'PAYMENTS_RETRIEVE'
export const PAYMENTS_SET_MESSAGE = 'PAYMENTS_SET_MESSAGE'
export const PAYMENTS_CLEAN_MESSAGE = 'PAYMENTS_CLEAN_MESSAGE'
export const PAYMENTS_SET_ERROR = 'PAYMENTS_SET_ERROR'
export const PAYMENTS_CLEAN_ERROR = 'PAYMENTS_CLEAN_ERROR'
export const PAYMENTS_FORM_CLEAN = 'PAYMENTS_FORM_CLEAN'
export const PAYMENTS_CLEAN = 'PAYMENTS_CLEAN'

export function getPayments (option, optionId, token, usertype = null) {
  return async function (dispatch) {
    let url = ''
    console.log('option', option)
    if (option === 'resident') {
      url = `/payment/${usertype}/${optionId}`
    } else if (option === 'condo') {
      url = `/payment/condo/${optionId}`
    }

    try {
      const { data } = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      dispatch({ type: PAYMENTS_RETRIEVE, payload: data.data })
    } catch (err) {
    }
  }
}

const initialState = {
  payments: [],
  adminPay: '',
  resident: '', 
  condo: '', 
  unit: '', 
  service: '', 
  value: 0, 
  dueDate: '', 
  message: '', 
  error: ''
}

function paymentReducer(state = initialState, action) {
  switch (action.type) {
    case PAYMENT_HANDLE_CHANGE:
      const { name, value } = action.payload
      return {
        ...state,
        [name]: value
      }
    case PAYMENT_CREATE:
      return {
        ...state,
        message: action.payload
      }
    case PAYMENTS_RETRIEVE:
      return {
        ...state,
        payments: action.payload
      }
    case PAYMENTS_SET_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case PAYMENTS_SET_MESSAGE:
      return {
        ...state,
        message: action.payload
      }
    case PAYMENTS_CLEAN_ERROR:
      return {
        ...state,
        error: ''
      }
    case PAYMENTS_CLEAN_MESSAGE:
      return {
        ...state,
        message: ''
      }
    case PAYMENTS_FORM_CLEAN:
      return {
        ...state,
        adminPay: '',
        resident: '', 
        condo: '', 
        unit: '', 
        service: '', 
        value: 0, 
        dueDate: '', 
      }
    case PAYMENTS_CLEAN:
      return {
        ...state,
        payments: []
      }
    default:
      return state;
    
  }
}

export default paymentReducer