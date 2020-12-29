import { CondosOuterDiv as UnitsOuterDiv, ContentTopBar, ContentTopBarTab } from '../condos/Condos'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import ContentPostUnit from './ContentPostUnit'
import ContentGetUnits from './ContentGetUnits'
import { Redirect } from 'react-router-dom'

function Units () {
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
      case 'Agregar Unidad':
        history.push('/dashboard/unit/add')
        return 
      case 'Ver Unidades':
        history.push('/dashboard/unit/list')
        return 
      default:
        history.push('/dashboard/unit')
        break;
    }
  }
  const renderTab = () => {
    const urlItems = history.location.pathname.split('/')

    switch (urlItems[3]) {
      case 'add':
        return <ContentPostUnit />
      case 'list':
        return <ContentGetUnits />
      default:
        break;
    }
  }

  return (
    !admin ? <Redirect to='/dashboard' /> : (
    <UnitsOuterDiv>
      <ContentTopBar>
        <ContentTopBarTab onClick={pickTab}>Agregar Unidad</ContentTopBarTab>
        <ContentTopBarTab onClick={pickTab}>Ver Unidades</ContentTopBarTab>
      </ContentTopBar>
      {renderTab()}
    </UnitsOuterDiv>
    )
  )
}

export default Units