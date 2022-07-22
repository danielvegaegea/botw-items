// Redux
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
// Helmet
import { Helmet } from 'react-helmet-async';
// Styled Component
import styled from 'styled-components';
// Slice
import {
  selectCompendium,
  setCompendiumFromData,
  setElementsToRender,
  setElementsInArray,
  setError,
} from '../features/hyruleCompendium/hyruleCompendiumSlice';
// Types
import {
  TypeBOTWCompendiumResponseData,
  TypeBOTWCompendiumArray,
  TypeCompendiumElement,
  TypeElementPropPage,
} from '../types';
// Components
import CompendiumFilter from '../components/BotwFilter';
import CompendiumElementEntry from '../components/BotwElement';

const StyledFilter = styled('section')`
  margin: 1rem 0;
  min-width: 30rem;
  @media screen and (orientation: portrait) {
    min-width: 10rem;
  }
`;

//
// Styled components Functions
//
const StyledList = styled('section')`
  margin-left: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 79vw;
  min-width: 39.5rem;
  max-width: 59.3rem;
  @media screen and (max-width: 1199px) {
    max-width: 40.4rem;
  }
  @media screen and (max-width: 815px) {
    min-width: unset;
    width: 40.4rem;
  }
  @media screen and (max-width: 665px) {
    min-width: unset;
    width: 32.5rem;

    & section {
      width: 27rem;
      font-size: 150%;
    }
  }
  @media screen and (orientation: portrait) and (max-width: 540px) {
    width: unset;
    min-width: unset;
    max-width: 94vw;
    font-size: 100%;
    display: unset;
  }
`;

//
// Functions
//
const getCompendium = async () => {
  // Obtenemos el compendio desde la API.
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

const VadeMecum = () => {
  const compendiumState = useAppSelector(selectCompendium);
  const { error } = useAppSelector(selectCompendium);

  const dispatch = useAppDispatch();

  //
  // Sub-Functions
  //
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

  //
  // Main
  //
  useEffect(() => {
    fetchCompendium();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    makeCompendiumArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compendiumState.compendium]);

  //
  // Creating Return Data
  //
  let retData;
  const rHelmet = (
    <Helmet>
      <title>BOTW Compendium: Vade Mecum</title>
    </Helmet>
  );

  const rFilter = (
    <StyledFilter className="zelda-window">
      <CompendiumFilter />
    </StyledFilter>
  );
  const rList = (
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
  );

  const rLoading = (
    <section>
      <h2>Hey, Listen!: Loading...</h2>
    </section>
  );

  const rError = (
    <section className="zelda-window">
      <h2>⚠️ Hey, Listen!: Data Error</h2>
      <p>It seems there's a problem with the API.</p>
      <p>Please try a while later.</p>
    </section>
  );

  if (error) {
    retData = (
      <>
        {rHelmet} {rError}
      </>
    );
  } else {
    if (compendiumState.elementsToRender) {
      retData = (
        <>
          {rHelmet} {rFilter} {rList}
        </>
      );
    } else {
      retData = (
        <div className="zelda-window">
          {rHelmet} {rLoading}
        </div>
      );
    }
  }
  return <>{retData}</>;
};

export default VadeMecum;
