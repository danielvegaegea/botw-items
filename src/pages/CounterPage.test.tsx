import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import Counter from '../features/counter/Counter';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Counter />
    </Provider>,
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});