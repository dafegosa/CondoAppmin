import axios from "axios"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"


const PaymentResponse = () => {
  
  const [response, setResponse] = useState('')
  const history = useHistory()
  const { location: { pathname, search } } = history

  function queryString(query) {
    const res = {}
    query
      .replace('?', '')
      .split('&')
      .forEach(q => {
        const [key, value] = q.split('=')
        res[key] = value
      })
    return res
  }

  useEffect(() => {
    const { ref_payco } = queryString(search)
    axios({
      method: 'GET',
      baseURL: 'https://api.secure.payco.co',
      url: `/validation/v1/reference/${ref_payco}`
    }).then(({ data }) => {
      setResponse(data.data.x_cod_transaction_state)
    })
  }, [search])

  return (
    <p>{`Respuesta de pago es: ${response}`}</p>
  )
}

export default PaymentResponse