/**
 *
 * Tests for UserNav
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';

import UserNav from '../index';

afterEach(cleanup);

describe('<UserNav />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<UserNav />);
    expect(spy).not.toHaveBeenCalled();
  });

  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<UserNav />);
    expect(firstChild).toMatchSnapshot();
  });

  it('Drawer appears after menubutton clicked', () => {
    const { getByTestId } = render(<UserNav />);
    const menuButton = getByTestId('menu-button');
    fireEvent(menuButton, new MouseEvent('click'));
  });
});
