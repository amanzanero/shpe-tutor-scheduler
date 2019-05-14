import React from 'react';
import { render } from 'react-testing-library';

import App from '../index';

describe('<App />', () => {
  it('renders and matches the snapshot', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
