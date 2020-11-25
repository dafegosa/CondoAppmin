import { Redirect, Route } from 'react-router-dom'

function PrivateRoute(props) {
  const token = localStorage.getItem('token')

  if(!token) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default PrivateRoute