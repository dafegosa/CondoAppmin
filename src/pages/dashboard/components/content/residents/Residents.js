import { CondosOuterDiv as ResidentsOuterDiv, ContentTopBar, ContentTopBarTab } from '../condos/Condos'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import ContentPostResident from './ContentPostResident'
import ContentGetResidents from './ContentGetResidents'
import { Redirect } from 'react-router-dom'

function Residents () {
  const { admin } = useSelector(({ sessionReducer: { admin } }) => {
    return { admin }
  })
  let history = useHistory()

  const pickTab = (e) => {
    e.preventDefault()
    const { outerText } = e.target

    let selectedButtons = document.querySelectorAll('.active')
    selectedButtons.forEach(button => button.classList.remove('active'))

    e.target.classList.add('active')

    switch (outerText) {
      case 'Agregar Residente':
        history.push('/dashboard/resident/add')
        return 
      case 'Ver Residentes':
        history.push('/dashboard/resident/list')
        return 
      default:
        history.push('/dashboard/resident')
        break;
    }
  }
  const renderTab = () => {
    const urlItems = history.location.pathname.split('/')

    switch (urlItems[3]) {
      case 'add':
        return <ContentPostResident />
      case 'list':
        return <ContentGetResidents />
      default:
        break;
    }
  }

  return (
    !admin ? <Redirect to='/dashboard' /> : (
    <ResidentsOuterDiv>
      <ContentTopBar>
        <ContentTopBarTab onClick={pickTab}>Agregar Residente</ContentTopBarTab>
        <ContentTopBarTab onClick={pickTab}>Ver Residentes</ContentTopBarTab>
      </ContentTopBar>
      {renderTab()}
    </ResidentsOuterDiv>
    )
  )
}

export default Residents