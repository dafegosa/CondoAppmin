import { cleanup, render, act, fireEvent, getByText, getByRole } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import ContentGetCondos from './ContentGetCondos'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import moxios from 'moxios'
import '@testing-library/jest-dom'
import { getCondos } from '../../../../../store/condoReducer'
// import store from '../../../../../store'

const middlewares  = [thunk]
const mockCondoReducer = configureStore(middlewares)

const condominios = [
  {
    _id: 1,
    name: 'name 1',
    address: 'address 1',
    unitIds: [1, 2, 3],
    residentIds: [1, 2]
  },
  {
    _id: 2,
    name: 'name 2',
    address: 'address 2',
    unitIds: [],
    residentIds: []
  },
  {
    _id: 3,
    name: 'name 3',
    address: 'address 3',
    unitIds: [],
    residentIds: []
  },
]

describe('Content get condos', () => {
  beforeEach(() => {
    moxios.install()
  })
  afterEach(() => {
    cleanup()
    moxios.uninstall()
  })

  it('should render a list of condos passed through the store when user is admin', async () => {

    const store = mockCondoReducer({
      condoReducer: {
        condos: condominios,
        condoName: '',
        condoAddress: '',
        message: '',
        error: ''
      },
      sessionReducer: {
        admin: true
      }
    })

    const { getAllByTestId, getByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ContentGetCondos />
        </MemoryRouter>
      </Provider>
    )

    const condos = getAllByTestId('condo')
    expect(condos.length).toBe(condominios.length)
  })
  it('should a message stating there are no condos yet', async () => {

    const store = mockCondoReducer({
      condoReducer: {
        condos: [],
        condoName: '',
        condoAddress: '',
        message: '',
        error: ''
      },
      sessionReducer: {
        admin: true
      }
    })

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ContentGetCondos />
        </MemoryRouter>
      </Provider>
    )

    const noCondosMessage = getByText(/no tienes condominios/i)
    expect(noCondosMessage).toBeInTheDocument()
  })
  it('should show the deletion dialog when clicking delete icon', async () => {

    const store = mockCondoReducer({
      condoReducer: {
        condos: condominios,
        condoName: '',
        condoAddress: '',
        message: '',
        error: ''
      },
      sessionReducer: {
        admin: true
      }
    })

    const { getAllByTestId, getByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ContentGetCondos />
        </MemoryRouter>
      </Provider>
    )

    const deleteButtons = getAllByTestId('delete')
    fireEvent.click(deleteButtons[0])

    const modal = getByRole('dialog')
    expect(modal).toBeInTheDocument()
  })
})