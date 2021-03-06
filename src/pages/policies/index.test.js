import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { useDispatch, useSelector, Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '../../matchMedia.mock';
import Policies from './index';
import { shallow } from 'enzyme';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn(),
}));

jest.mock('../../actions/policies', () => ({
  getPolicies: jest.fn(),
  addPolicy: jest.fn(),
}));

describe('Policies List component', () => {
  let store;
  let mockedDispatch;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn(() => ({}));
    mockedDispatch = jest.fn();
    useDispatch.mockReturnValue(mockedDispatch);
  });
  it('should render the component', () => {
    useSelector.mockImplementationOnce(() => ({}));
    const tree = shallow(
      <Provider store={store}>
        <Router>
          <Policies permission={{ actions: ['create'] }} />
        </Router>
      </Provider>,
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render the component with data', () => {
    useSelector.mockImplementationOnce(() => ({
      policies: [
        {
          id: 1,
          name: 'policy',
          description: 'description',
          users: [
            {
              id: 7,
              email: 'ross.geller@gmail.com',
              first_name: 'ross',
              last_name: 'geller',
            },
          ],
        },
      ],
      total: 1,
      loading: false,
    }));
    const tree = shallow(
      <Provider store={store}>
        <Router>
          <Policies permission={{ actions: ['create'] }} />
        </Router>
      </Provider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
