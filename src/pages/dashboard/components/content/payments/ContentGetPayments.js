import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPayments } from '../../../../../store/paymentReducer'


const ContentGetPayments = () => {

  const { admin } = useSelector(({ sessionReducer: { admin } }) => {
    return { admin }
  })
  const { currentCondoId } = useSelector(({ condoReducer: { currentCondoId } }) => {
    return { currentCondoId }
  })
  const { payments } = useSelector(({ paymentReducer: { payments } }) => {
    return { payments }
  })

  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (admin) dispatch(getPayments('condo', currentCondoId, token))
    if (!admin) dispatch(getPayments('resident', currentCondoId, token))
    
  }, [currentCondoId])

  return (
    <h1>Get Payments</h1>
  )
}

export default ContentGetPayments