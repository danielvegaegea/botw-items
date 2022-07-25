// Test
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// Redux
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
// Components
import CompendiumMasterFilter from './BotwMasterFilter';
import compendiumMasterReducer, {
  initialState,
} from '../features/hyruleCompendiumMaster/hyruleCompendiumMasterSlice';

describe('Compendium Master Filter', () => {
  test('renders', () => {
    const store = configureStore({
      reducer: {
        compendiumMaster: compendiumMasterReducer,
      },
      preloadedState: {
        compendiumMaster: initialState,
      },
    });

    render(
      <Provider store={store}>
        <CompendiumMasterFilter />
      </Provider>,
    );

    const heading = screen.getByText('Master Vade Mecum');
    expect(heading).toBeInTheDocument();
  });

  test('set the search state when user type on search input', async () => {
    const user = userEvent.setup();

    const store = configureStore({
      reducer: {
        compendiumMaster: compendiumMasterReducer,
      },
      preloadedState: {
        compendiumMaster: initialState,
      },
    });

    render(
      <Provider store={store}>
        <CompendiumMasterFilter />
      </Provider>,
    );

    const previousState = store.getState();

    expect(previousState.compendiumMaster).toEqual(initialState);

    // when
    // User type Star Wars
    const searchLabel = screen.getByLabelText('Search');

    await user.click(searchLabel);
    await user.keyboard('Star Wars');

    // expect
    await waitFor(() => {
      const forwardState = store.getState();
      expect(forwardState.compendiumMaster.search).toBe('Star Wars');
    });
  });
});
