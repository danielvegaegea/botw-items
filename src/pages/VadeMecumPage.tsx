import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';

import {
  selectCompendium,
  setCompendiumFromData,
  setError,
} from '../features/hyruleCompendium/hyruleCompendiumSlice';
import { BOTWCompendiumResponseData } from '../types';

import CompendiumFilter from '../components/BotwFilter';

const getCompendium = async () => {
  try {
    const response = await fetch(
      'https://botw-compendium.herokuapp.com/api/v2',
    );
    const compendium = (await response.json()) as BOTWCompendiumResponseData;
    return compendium;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const VadeMecum = () => {
  const compendiumState = useAppSelector(selectCompendium);
  const { error } = useAppSelector(selectCompendium);

  const dispatch = useAppDispatch();

  const fetchCompendium = async () => {
    try {
      const data = await getCompendium();
      dispatch(setCompendiumFromData(data));
      //console.log(data.data);
      console.log(data.data.monsters);
    } catch (error) {
      console.log(error);
      dispatch(setError());
    }
  };

  useEffect(() => {
    fetchCompendium();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <>
      <CompendiumFilter />
      {[error] ? (
        <h2>
          {' '}
          ERROR <span role="img">💥</span>
        </h2>
      ) : (
        <p>blah</p>
      )}

      {/* {compendiumState.compendium &&
        compendiumState.elementsToRender.data.data.monsters.map((compendium) => {
          // Getting the rest of values from country.
          const {
            name: { common },
            flags: { svg },
            cca3,
          } = country;

          return (
            <StyledCountry
              name={common}
              nativeName={nativeName}
              flagSrc={svg}
              key={cca3}
              link={cca3}
            />
          );
        })} */}
    </>
  );
};

export default VadeMecum;
