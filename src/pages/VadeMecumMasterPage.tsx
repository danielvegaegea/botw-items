// Redux
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
// Helmet
import { Helmet } from 'react-helmet-async';
// Styled Component
import styled from 'styled-components';
// Slice
import {
  selectCompendiumMaster,
  setCompendiumMasterFromData,
  setIdArray,
  setElementsToRender,
  setError,
} from '../features/hyruleCompendiumMaster/hyruleCompendiumMasterSlice';
// Types
import {
  TypeBOTWCompendiumArray,
  TypeBOTWCompendiumMasterResponseData,
  TypeCompendiumElement,
  TypeElementPropPage,
} from '../types';
// Components
import CompendiumMasterFilter from '../components/BotwMasterFilter';
import CompendiumMasterElementEntry from '../components/BotwMasterElement';

//
// Styled Functions
//
const StyledFilter = styled('section')`
  margin: 1rem 0;
  min-width: 30rem;
  @media screen and (orientation: portrait) {
    min-width: 10rem;
  }
`;

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
      'https://botw-compendium.herokuapp.com/api/v2/master_mode/all',
    );
    const compendiumMaster =
      (await response.json()) as TypeBOTWCompendiumMasterResponseData;
    return compendiumMaster.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const VadeMecumMaster = () => {
  // Default
  const compendiumState = useAppSelector(selectCompendiumMaster);
  const { error } = useAppSelector(selectCompendiumMaster);

  const dispatch = useAppDispatch();

  //
  // Sub-Functions
  //
  const createIdArray = async (masterArray: TypeBOTWCompendiumArray) => {
    // Genera un array con las ids de los cinco elementos que hay, para facilitar
    // la navegación usando las flechas en la página.
    let idList: string[];
    idList = masterArray!.map((cElement: TypeCompendiumElement) => {
      const data = cElement.id;
      return data.toString(10);
    });
    dispatch(setIdArray(idList));
  };
  const makeCompendiumToRender = async (arrayData: TypeBOTWCompendiumArray) => {
    // Si tenemos data, establecemos ElementsToRender.
    try {
      const data = arrayData ? arrayData : null;
      data && dispatch(setElementsToRender(data));
    } catch (error) {
      dispatch(setError());
    }
  };

  const fetchCompendium = async () => {
    // Obtenemos los datos de getCompendium.
    try {
      const data = await getCompendium();
      data!.sort((x: TypeCompendiumElement, y: TypeCompendiumElement) => {
        if (x.id > y.id) {
          return 1;
        }
        if (x.id < y.id) {
          return -1;
        }
        return 0;
      });
      dispatch(setCompendiumMasterFromData(data));
      return data;
    } catch (error) {
      console.log('¡Error! ' + error);
      dispatch(setError());
    }
  };

  const preparaData = async () => {
    // Esta función se ejecuta al principio y se encarga de ir "dictando" los pasos
    // a seguir para preparar todos los datos.
    // Dependiendo de si hay o no valores en los campos Search y Select, damos uno
    // u otro valor a los componentes a renderizar.
    let fetchData = await fetchCompendium();
    if (compendiumState.search === '') {
      await makeCompendiumToRender(fetchData as TypeBOTWCompendiumArray);
      createIdArray(fetchData as TypeBOTWCompendiumArray);
    }
  };

  //
  // Main
  //
  useEffect(() => {
    preparaData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Creamos los datos para devolver. Cada pequeño elemento se renderiza o no según
  // las condiciones que se den.
  let retData;
  const rHelmet = (
    <Helmet>
      <title>BOTW Compendium: Master Vade Mecum</title>
    </Helmet>
  );

  const rFilter = (
    <StyledFilter className="zelda-window">
      <CompendiumMasterFilter />
    </StyledFilter>
  );
  const rList = (
    <StyledList className="zelda-window">
      {compendiumState.elementsToRender &&
        compendiumState.elementsToRender.map(
          (cElement: TypeCompendiumElement) => {
            const { name, image, id }: TypeCompendiumElement = cElement;
            const props = {
              cName: name,
              cImgSrc: image,
              cId: id,
            } as TypeElementPropPage;

            return (
              <CompendiumMasterElementEntry {...props} key={id.toString()} />
            );
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

export default VadeMecumMaster;
