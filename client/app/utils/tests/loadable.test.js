/**
 * Cover loadable
 */
import React from 'react';
import loadable from '../loadable';

describe('<loadable />', () => {
  it('should render and match the snapshot', () => {
    const fallback = <div>Loading...</div>;
    loadable(() => import('../../containers/HomePage/Loadable'), { fallback });
  });
});
