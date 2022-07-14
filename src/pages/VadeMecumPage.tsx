import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';

import {
  selectCompendium,
  setCompendiumFromData,
  setError,
} from '../features/hyruleCompendium/hyruleCompendiumSlice';
import { BOTWCompendiumResponseData } from '../types';

const getCompendium = async () => {
  try {
    const response = await fetch(
      'https://botw-compendium.herokuapp.com/api/v2',
    );
    const compendium = (await response.json()) as BOTWCompendiumResponseData;
    return compendium;
  } catch (error) {
    throw error;
  }
};

const VadeMecum = () => {
  // const compendiumState = useAppSelector(selectCompendium);
  const { error } = useAppSelector(selectCompendium);

  const dispatch = useAppDispatch();

  const fetchCompendium = async () => {
    try {
      const data = await getCompendium();

      dispatch(setCompendiumFromData(data));
    } catch (error) {
      dispatch(setError());
    }
  };

  useEffect(() => {
    fetchCompendium();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return error ? (
    <>
      <h2>
        {' '}
        ERROR <span role="img">💥</span>
      </h2>
    </>
  ) : null;
};

export default VadeMecum;
