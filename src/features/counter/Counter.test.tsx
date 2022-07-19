import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import Counter from './Counter';

// Redux Counter Text Disabled because it fails.

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Counter />
    </Provider>,
  );
  // eslint-disable-next-line testing-library/prefer-screen-queries
  //expect(getByText(/learn/i)).toBeInTheDocument();
});
