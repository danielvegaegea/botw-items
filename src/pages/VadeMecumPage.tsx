import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import styled from 'styled-components';

import {
  selectCompendium,
  setCompendiumFromData,
  setElementsToRender,
  setElementsInArray,
  setError,
} from '../features/hyruleCompendium/hyruleCompendiumSlice';

import {
  T_BOTWCompendiumResponseData,
  T_BOTWCompendiumArray,
  T_CompendiumElement,
  T_ElementPropPage,
} from '../types';

import CompendiumFilter from '../components/BotwFilter';
import CompendiumElementEntry from '../components/BotwElement';

const getCompendium = async () => {
  try {
    const response = await fetch(
      'https://botw-compendium.herokuapp.com/api/v2',
    );
    const compendium = (await response.json()) as T_BOTWCompendiumResponseData;
    return compendium;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const StyledFilter = styled('section')`
  margin: 1rem 0;
  min-width: 30rem;
`;

const StyledList = styled('section')`
  margin-left: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 79vw;
  min-width: 39.5rem;
  max-width: 59.3rem;
  @media screen and (max-width: 1198px) {
    max-width: 40.4rem;
  }
  @media screen and (max-width: 815px) {
    //background-color: lightblue;
    & section {
      width: 27rem;
      font-size: 150%;
    }

    min-width: unset;
    max-width: 28rem;
  }
`;

const VadeMecum = () => {
  const compendiumState = useAppSelector(selectCompendium);
  const { error } = useAppSelector(selectCompendium);

  const dispatch = useAppDispatch();

  const makeCompendiumToRender = async () => {
    try {
      const data: T_BOTWCompendiumArray = compendiumState.compendiumArray
        ? compendiumState.compendiumArray
        : null;
      dispatch(setElementsToRender(data));
    } catch (error) {
      console.log(error);
      dispatch(setError());
    }
  };

  const makeCompendiumArray = async () => {
    //console.log('makeCompendiumArray');
    //console.log(compendiumState.compendium);
    try {
      const compendiumData = compendiumState.compendium
        ? compendiumState.compendium.data
        : null;
      //console.log(compendiumState.compendium);
      const completeArray = compendiumData
        ? ([
            ...compendiumData.creatures.food,
            ...compendiumData.creatures.non_food,
            ...compendiumData.equipment,
            ...compendiumData.materials,
            ...compendiumData.monsters,
            ...compendiumData.treasure,
          ] as T_BOTWCompendiumArray)
        : null;
      //console.log(completeArray);
      dispatch(setElementsInArray(completeArray));
      compendiumState.compendiumArray && makeCompendiumToRender();
    } catch {
      console.log(error);
      dispatch(setError());
    }
  };

  const fetchCompendium = async () => {
    try {
      const data = await getCompendium();
      dispatch(setCompendiumFromData(data));
    } catch (error) {
      console.log('¡Error! ' + error);
      dispatch(setError());
    }
  };

  useEffect(() => {
    fetchCompendium();
    //makeCompendiumToRender();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    makeCompendiumArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compendiumState.compendium]);

  /* useEffect(() => {
    initCompendiumToRender();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]); */

  /* compendiumState.compendiumArray &&
    console.log(compendiumState.compendiumArray);
  compendiumState.elementsToRender &&
    console.log(compendiumState.elementsToRender);
  error && console.log(error);
  console.log('Before Return');
  console.log(compendiumState.elementsToRender); */
  return (
    <>
      <StyledFilter className="zelda-window">
        <CompendiumFilter />
        {error ? (
          <h2>
            {' '}
            ERROR <span role="img">💥</span>
          </h2>
        ) : null}
      </StyledFilter>

      <StyledList className="zelda-window">
        {compendiumState.elementsToRender &&
          compendiumState.elementsToRender.map(
            (cElement: T_CompendiumElement) => {
              // Getting the rest of values from country.
              const { name, image, id }: T_CompendiumElement = cElement;
              const props = {
                c_name: name,
                c_imgSrc: image,
                c_id: id,
              } as T_ElementPropPage;

              return <CompendiumElementEntry {...props} key={id.toString()} />;
            },
          )}
      </StyledList>
    </>
  );
};

export default VadeMecum;
