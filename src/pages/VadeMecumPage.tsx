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
  setCategoriesInArray,
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
  // Default
  const compendiumState = useAppSelector(selectCompendium);
  const { error } = useAppSelector(selectCompendium);

  const dispatch = useAppDispatch();

  //
  // Sub-Functions
  //
  const makeCompendiumToRender = async (arrayData: TypeBOTWCompendiumArray) => {
    // Si tenemos data, establecemos ElementsToRender.
    try {
      const data = arrayData ? arrayData : null;
      data && dispatch(setElementsToRender(data));
    } catch (error) {
      dispatch(setError());
    }
  };

  const makeEquipmentCategories = async (
    // Generamos los array con las distintas categorías desde la Array generada
    // previamente. Para ello, usamos una serie de palabras claves pre-establecidas
    // y comprobadas para que surtan el efecto adecuado, asumiendo que la API
    // no cambie en el futuro, cosa poco probable dada la antiguedad del juego.
    arrayData: TypeBOTWCompendiumArray,
  ) => {
    let data = {
      Axes: [] as TypeBOTWCompendiumArray,
      Arrows: [] as TypeBOTWCompendiumArray,
      Blades: [] as TypeBOTWCompendiumArray,
      Blunt: [] as TypeBOTWCompendiumArray,
      Bows: [] as TypeBOTWCompendiumArray,
      Hammers: [] as TypeBOTWCompendiumArray,
      Long: [] as TypeBOTWCompendiumArray,
      NonCombat: [] as TypeBOTWCompendiumArray,
      Rods: [] as TypeBOTWCompendiumArray,
      Throwing: [] as TypeBOTWCompendiumArray,
      Shields: [] as TypeBOTWCompendiumArray,
    };
    let searchString: Array<RegExp>,
      resetSrc: Array<RegExp> = [];
    for (let i = 0; i < 10; i++) {
      resetSrc[i] = /(?=a)b/;
    }
    searchString = resetSrc;
    let filteredCompendium: TypeBOTWCompendiumArray;

    const newSearch = (searchAr: Array<RegExp>) => {
      let data = resetSrc;
      for (let i = 0; i < 10; i++) {
        data[i] = searchAr[i] ? searchAr[i] : /(?=a)b/;
      }
      return data;
    };

    const filterArray = (searchString: RegExp[]) => {
      let filteredData = arrayData
        ? (arrayData.filter((cElement: TypeCompendiumElement) => {
            // Filtramos propiamente el compendio y los devolvemos.
            return (
              searchString[0].test(cElement.name) ||
              searchString[1].test(cElement.name) ||
              searchString[2].test(cElement.name) ||
              searchString[3].test(cElement.name) ||
              searchString[4].test(cElement.name) ||
              searchString[5].test(cElement.name) ||
              searchString[6].test(cElement.name) ||
              searchString[7].test(cElement.name) ||
              searchString[8].test(cElement.name) ||
              searchString[9].test(cElement.name)
            );
          }) as TypeBOTWCompendiumArray)
        : ([] as TypeBOTWCompendiumArray);
      return filteredData;
    };

    // Preparando Axes Array
    searchString = newSearch([/axe/i]);
    filteredCompendium = filterArray(searchString);
    data.Axes = filteredCompendium;
    // Preparando Arrows
    searchString = newSearch([/arrow/i]);
    filteredCompendium = filterArray(searchString);
    data.Arrows = filteredCompendium;
    // Preparando Blades
    searchString = newSearch([
      /sword/i,
      /claymore/i,
      /blade/i,
      /obliterator/i,
      /windcleaver/i,
      /scimitar/i,
      / edge/i,
      /edge /i,
      /carver/i,
      /sickle/i,
    ]);
    filteredCompendium = filterArray(searchString);
    data.Blades = filteredCompendium;
    // Preparando Blunt
    searchString = newSearch([/boko bat/i, /club/i, / arm/i, /ladle/i]);
    filteredCompendium = filterArray(searchString);
    data.Blunt = filteredCompendium;
    // Preparando Bows
    searchString = newSearch([/bow/i]);
    filteredCompendium = filterArray(searchString);
    data.Bows = filteredCompendium;
    // Preparando Hammers
    searchString = newSearch([
      /hammer/i,
      /crusher/i,
      /boulder/i,
      /drillshaft/i,
      /smasher/i,
    ]);
    filteredCompendium = filterArray(searchString);
    data.Hammers = filteredCompendium;
    // Preparando Long
    searchString = newSearch([/spear/i, /trident/i, /halberd/i, /harpoon/i]);
    filteredCompendium = filterArray(searchString);
    data.Long = filteredCompendium;
    // Preparando Non Combat
    searchString = newSearch([
      /pitchfork/i,
      /hoe/i,
      /torch/i,
      /branch/i,
      / lid/i,
      /leaf/i,
      /oar/i,
      /mop/i,
    ]);
    filteredCompendium = filterArray(searchString);
    data.NonCombat = filteredCompendium;
    // Preparando Rods Array
    searchString = newSearch([/rod/i]);
    filteredCompendium = filterArray(searchString);
    data.Rods = filteredCompendium;
    // Preparando Throwing Array
    searchString = newSearch([/boomerang/i]);
    filteredCompendium = filterArray(searchString);
    data.Throwing = filteredCompendium;
    // Preparando Shields
    searchString = newSearch([/shield/i, /daybreaker/i]);
    filteredCompendium = filterArray(searchString);
    data.Shields = filteredCompendium;
    // Dispatch Data
    dispatch(setCategoriesInArray(data));
  };

  const makeCompendiumArray = async (
    // Generamos el array que usaremos para la categoría "All" y las sub-categorías
    // de Equipment.
    fetchData: TypeBOTWCompendiumResponseData,
  ) => {
    try {
      const completeArray = fetchData
        ? ([
            ...fetchData.data.creatures.food,
            ...fetchData.data.creatures.non_food,
            ...fetchData.data.equipment,
            ...fetchData.data.materials,
            ...fetchData.data.monsters,
            ...fetchData.data.treasure,
          ] as TypeBOTWCompendiumArray)
        : null;
      dispatch(setElementsInArray(completeArray));
      return completeArray;
    } catch {
      console.log(error);
      dispatch(setError());
    }
  };

  const fetchCompendium = async () => {
    // Obtenemos los datos de getCompendium.
    try {
      const data = await getCompendium();
      dispatch(setCompendiumFromData(data));
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
    let arrayData;
    if (fetchData) {
      arrayData = await makeCompendiumArray(fetchData);
    }
    if (
      arrayData &&
      compendiumState.search === '' &&
      compendiumState.category === 'All'
    ) {
      await makeEquipmentCategories(
        fetchData?.data.equipment as TypeBOTWCompendiumArray,
      );
      await makeCompendiumToRender(arrayData as TypeBOTWCompendiumArray);
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
