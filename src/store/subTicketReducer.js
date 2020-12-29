export const RENDER_SUBTICKETS = 'RENDER_SUBTICKETS'

const initialState = {
  renderSubTicket: false,
}

function subTicketReducer(state = initialState, action) {
  switch (action.type) {
    case RENDER_SUBTICKETS:
      return {
        ...state,
        renderSubTicket: !state.renderSubTicket,
      }
    default:
      return state
  }
}

export default subTicketReducer
