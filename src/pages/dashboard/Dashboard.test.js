import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { MemoryRouter, Router } from 'react-router-dom'
import Dashboard from './Dashboard'
import '@testing-library/jest-dom'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('Dashboard', () => {
  it('should render LeftMenu, TopBar, Content and MessagesArea components', () => {

    const mockedStore = mockStore({
      sessionReducer: {
        admin: true,
        resident: false,
        currentOption: ''
      },
      condoReducer: {
        condos: []
      },
      messageReducer: {
        messages: []
      },
      subTicketReducer: {
        renderSubTicket: false
      }
    })

    const theme = {
      mainColor: 'rgba(96, 125, 139, 1)',
      secondaryColor: 'rgba(96, 125, 139, 0.7)',
      thirdColor: 'rgba(255, 191, 91, 0.9)',
    }

    const { getByRole, debug, getByTestId } = render(
      <Provider store={mockedStore}>
        <MemoryRouter>
          <ThemeProvider theme={theme}>
            <Dashboard />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    )
    
    const content = getByRole('main')
    expect(content).toBeInTheDocument()

    const leftMenu = getByTestId('left-menu')
    expect(leftMenu).toBeInTheDocument()

    const topBar = getByTestId('top-bar')
    expect(topBar).toBeInTheDocument()
    
    const messagesArea = getByTestId('messages-area')
    expect(messagesArea).toBeInTheDocument()

  })
})