import { cleanup, render, act, fireEvent, getByText, getByRole } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import ContentGetResidents from './ContentGetResidents'
import { MemoryRouter } from 'react-router-dom'
import moxios from 'moxios'
import '@testing-library/jest-dom'

const middlewares  = [thunk]
const mockResidentReducer = configureStore(middlewares)

const residentes = [
  {
    _id: 1,
    name: 'name 1',
    lastName: 'lastName 1',
    address: 'address 1',
    unitId: {
      name: '101'
    },
  },
  {
    _id: 2,
    name: 'name 2',
    lastName: 'lastName 2',
    address: 'address 2',
    unitId: {
      name: '102'
    },
  },
  {
    _id: 3,
    name: 'name 3',
    lastName: 'lastName 3',
    address: 'address 3',
    unitId: {
      name: '103'
    },
  },
]

describe('Content get residents', () => {
  beforeEach(() => {
    moxios.install()
  })
  afterEach(() => {
    cleanup()
    moxios.uninstall()
  })

  it('should render a list of residents passed through the store when user is admin', async () => {

    const store = mockResidentReducer({
      residentReducer: {
        residents: residentes,
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
          <ContentGetResidents />
        </MemoryRouter>
      </Provider>
    )

    const residents = getAllByTestId('resident')
    expect(residents.length).toBe(residentes.length)
  })

  it('should render a message stating there are no residents yet', async () => {

    const store = mockResidentReducer({
      residentReducer: {
        residents: [],
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
          <ContentGetResidents />
        </MemoryRouter>
      </Provider>
    )

    const noResidentsMessage = getByText(/no tienes residentes/i)
    expect(noResidentsMessage).toBeInTheDocument()
  })
  it('should show the deletion dialog when clicking delete icon', async () => {

    const store = mockResidentReducer({
      residentReducer: {
        residents: residentes,
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
          <ContentGetResidents />
        </MemoryRouter>
      </Provider>
    )

    const deleteButtons = getAllByTestId('delete')
    fireEvent.click(deleteButtons[0])

    const modal = getByRole('dialog')
    expect(modal).toBeInTheDocument()
  }) 
})