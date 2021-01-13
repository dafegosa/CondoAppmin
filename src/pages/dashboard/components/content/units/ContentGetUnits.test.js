import { cleanup, render, act, fireEvent, getByText, getByRole } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import ContentGetUnits from './ContentGetUnits'
import { MemoryRouter } from 'react-router-dom'
import moxios from 'moxios'
import '@testing-library/jest-dom'

const middlewares  = [thunk]
const mockUnitReducer = configureStore(middlewares)

const unidades = [
  {
    _id: 1,
    name: 'name 1',
    resident: {
      name: 'name 1',
      lastName: 'lastname 1'
    },
  },
  {
    _id: 2,
    name: 'name 2',
    resident: {
      name: 'name 2',
      lastName: 'lastname 2'
    },
  },
  {
    _id: 3,
    name: 'name 3',
    resident: {
      name: 'name 3',
      lastName: 'lastname 3'
    },
  },
]

describe('Content get units', () => {
  beforeEach(() => {
    moxios.install()
  })
  afterEach(() => {
    cleanup()
    moxios.uninstall()
  })

  it('should render a list of units passed through the store when user is admin', async () => {

    const store = mockUnitReducer({
      unitReducer: {
        units: unidades,
        unitName: '',
        message: '',
        error: ''
      },
      sessionReducer: {
        admin: true
      },
      condoReducer: {
        currentCondoId: '',
        currentCondoName: ''
      }
    })

    const { getAllByTestId, getByRole, debug } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ContentGetUnits />
        </MemoryRouter>
      </Provider>
    )
    
    const units = getAllByTestId('unit')
    expect(units.length).toBe(unidades.length)
  })

  it('should render a message stating there are no units yet', async () => {

    const store = mockUnitReducer({
      unitReducer: {
        units: [],
        unitName: '',
        message: '',
        error: ''
      },
      sessionReducer: {
        admin: true
      },
      condoReducer: {
        currentCondoId: '',
        currentCondoName: ''
      }
    })

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ContentGetUnits />
        </MemoryRouter>
      </Provider>
    )

    const noUnitsMessage = getByText(/no tienes unidades/i)
    expect(noUnitsMessage).toBeInTheDocument()
  })
  it('should show the deletion dialog when clicking delete icon', async () => {

    const store = mockUnitReducer({
      unitReducer: {
        units: unidades,
        unitName: '',
        message: '',
        error: ''
      },
      sessionReducer: {
        admin: true
      },
      condoReducer: {
        currentCondoId: '',
        currentCondoName: ''
      }
    })

    const { getAllByTestId, getByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ContentGetUnits />
        </MemoryRouter>
      </Provider>
    )

    const deleteButtons = getAllByTestId('delete')
    fireEvent.click(deleteButtons[0])

    const modal = getByRole('dialog')
    expect(modal).toBeInTheDocument()
  }) 
})