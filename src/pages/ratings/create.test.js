import React from 'react';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import renderer, { act } from 'react-test-renderer';
import { useDispatch, Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '../../matchMedia.mock';
import CreateRating from './create';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn(),
}));

jest.mock('../../actions/ratings', () => ({
  getRatings: jest.fn(),
  addRating: jest.fn(),
}));

describe('Ratings List component', () => {
  let store;
  let mockedDispatch;

  beforeEach(() => {
    store = mockStore({
      ratings: {
        req: [],
        details: {},
        loading: true,
      },
      media: {
        req: [],
        details: {},
        loading: true,
      },
    });
    store.dispatch = jest.fn(() => ({}));
    mockedDispatch = jest.fn();
    useDispatch.mockReturnValue(mockedDispatch);
  });
  it('should render the component', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <CreateRating />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
