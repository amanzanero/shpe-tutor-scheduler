/**
 * Page level reducer for the landing page
 */
import { TOGGLE_LOGIN_MODAL } from '../../types';

const initState = {
  modalOpen: false,
};

const landingPage = (state = initState, action) => {
  switch (action.type) {
    case TOGGLE_LOGIN_MODAL:
      return { ...state, modalOpen: !state.modalOpen };
    default:
      return state;
  }
};

export default landingPage;
