import axios from 'axios'
export const PAYMENT_FORM_CLEAN = 'PAYMENT_FORM_CLEAN'
export const PAYMENT_CREATE = 'PAYMENT_CREATE'
export const PAYMENT_HANDLE_CHANGE = 'PAYMENT_HANDLE_CHANGE'
export const PAYMENTS_RETRIEVE = 'PAYMENTS_RETRIEVE'

export function getPayments (option, optionId, token) {
  return async function (dispatch) {
    let url = ''

    if (option === 'resident') {
      url = `/payment/${optionId}`
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
    default:
      return state;
    
  }
}

export default paymentReducer