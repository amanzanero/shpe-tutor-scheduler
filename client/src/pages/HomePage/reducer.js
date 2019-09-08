/**
 * Page level reducer for the landing page
 */
import { TOGGLE_SETTINGS } from '../../types';

const initState = {
  settingsOpen: false,
  loading: true,
  pageErr: {
    status: false,
    message: '',
  },
};

const homePage = (state = initState, action) => {
  switch (action.type) {
    case TOGGLE_SETTINGS:
      return { ...state, settingsOpen: !state.settingsOpen };
    default:
      return state;
  }
};

export default homePage;
