import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCompendium,
  setCompendiumFromData,
  setError,
} from '../features/hyruleCompendium/hyruleCompendiumSlice';

const getCompendium = async () => {
  try {
    const response = await fetch(
      'https://botw-compendium.herokuapp.com/api/v2',
    );
    const compendium = await response.json();
    return compendium;
  } catch (error) {
    throw error;
  }
};

const VadeMecum = () => {
  const compendiumState = useSelector(selectCompendium);
  const dispatch = useDispatch();

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
  }, [compendiumState.error]);

  return (
    <>
      {compendiumState.error ? (
        <h2>
          {' '}
          ERROR <span role="img">💥</span>
        </h2>
      ) : null}
    </>
  );
};

export default VadeMecum;
