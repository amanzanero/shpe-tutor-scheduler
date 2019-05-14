import { selectLanguage } from '../selectors';
import { initialState } from '../reducer';

describe('selectLanguage', () => {
  it('should select the global state', () => {
    const globalState = {};
    const mockedState = {
      language: globalState,
    };
    expect(selectLanguage(mockedState)).toEqual(globalState);
  });

  it('should select the initial state', () => {
    const mockState = {
      language: false,
    };
    expect(selectLanguage(mockState)).toEqual(initialState);
  });
});
