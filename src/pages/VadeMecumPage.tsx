import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

import {
  selectCompendium,
  setCompendiumFromData,
  setElementsToRender,
  setElementsInArray,
  setError,
} from '../features/hyruleCompendium/hyruleCompendiumSlice';

import {
  TypeBOTWCompendiumResponseData,
  TypeBOTWCompendiumArray,
  TypeCompendiumElement,
  TypeElementPropPage,
} from '../types';

import CompendiumFilter from '../components/BotwFilter';
import CompendiumElementEntry from '../components/BotwElement';

const getCompendium = async () => {
  try {
    const response = await fetch(
      'https://botw-compendium.herokuapp.com/api/v2',
    );
    const compendium =
      (await response.json()) as TypeBOTWCompendiumResponseData;
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
      const data: TypeBOTWCompendiumArray = compendiumState.compendiumArray
        ? compendiumState.compendiumArray
        : null;
      dispatch(setElementsToRender(data));
    } catch (error) {
      console.log(error);
      dispatch(setError());
    }
  };

  const makeCompendiumArray = async () => {
    try {
      const compendiumData = compendiumState.compendium
        ? compendiumState.compendium.data
        : null;
      const completeArray = compendiumData
        ? ([
            ...compendiumData.creatures.food,
            ...compendiumData.creatures.non_food,
            ...compendiumData.equipment,
            ...compendiumData.materials,
            ...compendiumData.monsters,
            ...compendiumData.treasure,
          ] as TypeBOTWCompendiumArray)
        : null;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    makeCompendiumArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compendiumState.compendium]);

  return (
    <>
      <StyledFilter className="zelda-window">
        <Helmet>
          <title>BOTW Vade Mecum: Vade Mecum</title>
        </Helmet>
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
            (cElement: TypeCompendiumElement) => {
              // Getting the rest of values from country.
              const { name, image, id }: TypeCompendiumElement = cElement;
              const props = {
                cName: name,
                cImgSrc: image,
                cId: id,
              } as TypeElementPropPage;

              return <CompendiumElementEntry {...props} key={id.toString()} />;
            },
          )}
      </StyledList>
    </>
  );
};

export default VadeMecum;
