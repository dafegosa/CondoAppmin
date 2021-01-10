import { cleanup, fireEvent, render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { MemoryRouter, Router, useHistory } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import '@testing-library/jest-dom'
import LeftMenu from './LeftMenu'
import Dashboard from '../../Dashboard'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
    location: {
      pathname: '/dashboard'
    }
  }),
}))

const addClassToMenuItem = jest.fn()

describe('Left Menu', () => {
  afterEach(() => {
    cleanup()
  })

  it('should render all options on admin login', () => {

    const mockedStore = mockStore({
      sessionReducer: {
        admin: true,
        resident: false,
        currentOption: ''
      },
      condoReducer: {
        condos: []
      },
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
            <LeftMenu />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    )
    
    const condosOption = getByTestId('condo')
    expect(condosOption).toBeInTheDocument()

    const unitsOption = getByTestId('unit')
    expect(unitsOption).toBeInTheDocument()
    
    const residentsOption = getByTestId('resident')
    expect(residentsOption).toBeInTheDocument()

    const ticketsOption = getByTestId('ticket')
    expect(ticketsOption).toBeInTheDocument()

    const messagesOption = getByTestId('message')
    expect(messagesOption).toBeInTheDocument()

    const paymentsOption = getByTestId('payment')
    expect(paymentsOption).toBeInTheDocument()

    const venuesOption = getByTestId('venue')
    expect(venuesOption).toBeInTheDocument()

  })
  it('should redirect on left option click', () => {

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

    const { debug, getByTestId } = render(
      <Provider store={mockedStore}>
        <ThemeProvider theme={theme} >
          <MemoryRouter>
            <Dashboard /> 
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    )
    
    const condosOption = getByTestId('condo')
    fireEvent.click(condosOption)
    expect(mockHistoryPush).toHaveBeenCalledWith('/dashboard/condo')

    const unitsOption = getByTestId('unit')
    fireEvent.click(unitsOption)
    expect(mockHistoryPush).toHaveBeenCalledWith('/dashboard/unit')
  })

  it('should render only resident options on resident login', () => {

    const mockedStore = mockStore({
      sessionReducer: {
        admin: false,
        resident: true,
        currentOption: ''
      },
      condoReducer: {
        condos: []
      },
    })

    const theme = {
      mainColor: 'rgba(96, 125, 139, 1)',
      secondaryColor: 'rgba(96, 125, 139, 0.7)',
      thirdColor: 'rgba(255, 191, 91, 0.9)',
    }

    const { queryByText, getByTestId } = render(
      <Provider store={mockedStore}>
        <MemoryRouter>
          <ThemeProvider theme={theme}>
            <LeftMenu />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    )

    expect(queryByText('Condominios')).toBeNull()
    expect(queryByText('Unidades')).toBeNull()
    expect(queryByText('Residentes')).toBeNull()

    expect(getByTestId('ticket')).toBeInTheDocument()
    expect(getByTestId('message')).toBeInTheDocument()
    expect(getByTestId('payment')).toBeInTheDocument()
    expect(getByTestId('venue')).toBeInTheDocument()
  })

  it('should add active-item class to option selected', () => {

    const optionSelected = 'condo'

    const mockedStore = mockStore({
      sessionReducer: {
        admin: true,
        resident: false,
        currentOption: optionSelected
      },
      condoReducer: {
        condos: []
      },
    })

    const theme = {
      mainColor: 'rgba(96, 125, 139, 1)',
      secondaryColor: 'rgba(96, 125, 139, 0.7)',
      thirdColor: 'rgba(255, 191, 91, 0.9)',
    }

    const { queryByText, debug, getByTestId, container } = render(
      <Provider store={mockedStore}>
        <MemoryRouter>
          <ThemeProvider theme={theme}>
            <LeftMenu />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    )
    
    const condosOption = getByTestId(optionSelected)
    expect(condosOption.className).toMatch(/active/i)
  })
})