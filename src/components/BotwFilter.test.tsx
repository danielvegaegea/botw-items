// Test
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// Redux
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
// Components
import CompendiumFilter from './BotwFilter';
import compendiumReducer, {
  initialState,
} from '../features/hyruleCompendium/hyruleCompendiumSlice';

describe('Compendium Filter', () => {
  test('renders', () => {
    const store = configureStore({
      reducer: {
        compendium: compendiumReducer,
      },
      preloadedState: {
        compendium: initialState,
      },
    });

    render(
      <Provider store={store}>
        <CompendiumFilter />
      </Provider>,
    );

    const heading = screen.getByText('Vade Mecum');
    expect(heading).toBeInTheDocument();
  });

  test('change category state when a category option is selected', async () => {
    const user = userEvent.setup();

    const store = configureStore({
      reducer: {
        compendium: compendiumReducer,
      },
      preloadedState: {
        compendium: initialState,
      },
    });

    render(
      <Provider store={store}>
        <CompendiumFilter />
      </Provider>,
    );

    const previousState = store.getState();

    expect(previousState.compendium).toEqual(initialState);

    // when
    // User selects food
    const dropdown = await screen.findByRole('combobox');
    expect(dropdown).toBeDefined();

    await user.selectOptions(dropdown, ['Treasure']);

    const treasureOptionElement: HTMLOptionElement = screen.getByRole(
      'option',
      {
        name: 'Treasure',
      },
    );

    expect(treasureOptionElement.selected).toBe(true);

    const forwardState = store.getState();

    expect(forwardState.compendium.category).toEqual('Treasure');
  });

  test('set the search state when user type on search input', async () => {
    const user = userEvent.setup();

    const store = configureStore({
      reducer: {
        compendium: compendiumReducer,
      },
      preloadedState: {
        compendium: initialState,
      },
    });

    render(
      <Provider store={store}>
        <CompendiumFilter />
      </Provider>,
    );

    const previousState = store.getState();

    expect(previousState.compendium).toEqual(initialState);

    // when
    // User type Star Wars
    const searchLabel = screen.getByLabelText('Search');

    await user.click(searchLabel);
    await user.keyboard('Star Wars');

    // expect
    await waitFor(() => {
      const forwardState = store.getState();

      expect(forwardState.compendium.search).toBe('Star Wars');
    });
  });
});
