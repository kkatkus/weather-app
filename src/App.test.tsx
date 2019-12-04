import React from 'react';
import { shallow } from 'enzyme';

import App from './App';
import { MemoryRouter } from 'react-router';
import { getMockProvider } from './utils/test';

describe('<App />', () => {
  it('matches snapshot', () => {
    const { MockProvider } = getMockProvider();
    const wrapper = shallow(
      <MockProvider>
        <MemoryRouter initialEntries={[{ pathname: '/weather', key: 'ratesKey' }]}>
          <App />
        </MemoryRouter>
      </MockProvider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
