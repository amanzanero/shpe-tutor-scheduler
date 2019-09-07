/**
 * Page level reducer for the landing page
 */
import { TOGGLE_SETTINGS } from '../../types';

const initState = {
  settingsOpen: false,
  loading: false,
  pageErr: {
    status: false,
    message: '',
  },
};

const homePage = (state = initState, action) => {
  switch (action.type) {
    case TOGGLE_SETTINGS:
      return { ...state, settingsOpen: !state.modalOpen };
    default:
      return state;
  }
};

export default homePage;
