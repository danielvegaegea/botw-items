import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import Counter from './Counter';

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <Counter />
    </Provider>,
  );
  //expect(screen.getByText(/learn/i)).toBeInTheDocument();
  expect(screen.getByText('Odd')).toBeInTheDocument();
});
