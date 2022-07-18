import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import styled from 'styled-components';

import {
  selectCompendium,
  setCompendiumFromData,
  setElementsToRender,
  setError,
  /* setEpage, */
} from '../features/hyruleCompendium/hyruleCompendiumSlice';
import {
  T_BOTWCompendiumResponseData,
  T_CompendiumElement,
  T_ElementPage,
} from '../types';

import CompendiumFilter from '../components/BotwFilter';
import CompendiumElementPage from '../components/BotwElement';

const getCompendium = async () => {
  try {
    const response = await fetch(
      'https://botw-compendium.herokuapp.com/api/v2',
    );
    const compendium = (await response.json()) as T_BOTWCompendiumResponseData;
    console.log('OK Get');
    return compendium;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const StyledCompendiumElement = styled(CompendiumElementPage)`
  border: 2px solid red;
`;

const VadeMecum = () => {
  const compendiumState = useAppSelector(selectCompendium);
  const { error } = useAppSelector(selectCompendium);

  const dispatch = useAppDispatch();

  const fetchCompendium = async () => {
    try {
      const data = await getCompendium();
      dispatch(setCompendiumFromData(data));
      console.log('OK Fetch');
      //console.log(data.data);
      //console.log(data.data.monsters);
    } catch (error) {
      console.log('¡Error! ' + error);
      dispatch(setError());
    }
  };

  const initCompendiumToRender = async () => {
    try {
      const data = compendiumState.compendiumArray
        ? compendiumState.compendiumArray
        : null;
      data && dispatch(setElementsToRender(data));
      data && console.log(data);
    } catch (error) {
      console.log(error);
      dispatch(setError());
    }
  };

  useEffect(() => {
    fetchCompendium();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    initCompendiumToRender();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  compendiumState.compendiumArray &&
    console.log(compendiumState.compendiumArray);
  compendiumState.elementsToRender &&
    console.log(compendiumState.elementsToRender);
  error && console.log(error);
  console.log('Before Return');
  console.log(compendiumState.elementsToRender);
  return (
    <>
      <CompendiumFilter />
      {error ? (
        <h2>
          {' '}
          ERROR <span role="img">💥</span>
        </h2>
      ) : null}

      {compendiumState.elementsToRender &&
        compendiumState.elementsToRender.map(
          (cElement: T_CompendiumElement) => {
            // Getting the rest of values from country.
            const { name, image, id }: T_CompendiumElement = cElement;
            const props = {
              c_name: name,
              c_imgSrc: image,
              c_id: id,
            } as T_ElementPage;
            console.log('Before Dispatch Prop.');

            //dispatch(setEpage(props));

            return (
              <StyledCompendiumElement>
                <CompendiumElementPage />
              </StyledCompendiumElement>
            );
          },
        )}
    </>
  );
};

export default VadeMecum;
