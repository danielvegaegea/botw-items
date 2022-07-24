// React
import { ChangeEvent, useEffect } from 'react';
// Redux
import { useAppDispatch, useAppSelector } from '../app/hooks';
// Styled Components
import styled from 'styled-components';
// Compendium Slyce
import {
  selectCompendium,
  setCategory,
  setElementsToRender,
  setSearch,
} from '../features/hyruleCompendium/hyruleCompendiumSlice';
// Types
import {
  TypeBOTWCompendiumArray,
  TypeCompendiumElement,
  TypeCategory,
} from '../types';

//
// Styed Components Functions
//
const StyledSection = styled('section')`
  padding: 0.5rem;
  & form {
    width: 30rem;
    display: flex;
    flex-direction: column;
    & select,
    & input {
      margin-left: 0.5rem;
      background-color: hsla(0, 0%, 0%, 30%);
      color: white;
      border: 1px solid hsla(100, 100%, 100%, 20%);
    }
    & select {
      margin-right: 0.5rem;
    }
  }
  @media screen and (orientation: portrait) {
    & form {
      width: 80vw;
    }
    & select,
    & input {
      max-width: 75vw;
    }
  }
`;

const StyledResetButton = styled.button`
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  margin-top: 0.2rem;
  border: 1px solid gray;
  border-radius: 15px;
  width: 5rem;
  @media screen and (orientation: portrait) {
    margin-right: 2rem;
  }
`;

const StyledPanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & p {
    background-color: rgba(0, 0, 0, 0.5);
    color: lightblue;
    border: 1px solid gray;
    border-radius: 5px;
    line-height: 0.9rem;
    height: 1.7rem;
    margin: 0.4rem 1rem 0 0;
    padding: 0.4rem 0.4rem 1rem 0.4rem;
  }
  @media screen and (orientation: portrait) and (max-width: 540px) {
    flex-direction: column-reverse;
    align-items: flex-start;
    button {
      margin-top: 0.3rem;
    }
  }
`;

//
// Functions
//
const CompendiumFilter = () => {
  // Default
  // Genera un array con todos los 389 elementos del compendio y los almacena en
  // BOTWCompendiumArray para ser usados en la categoróa "All".
  const compendiumState = useAppSelector(selectCompendium);
  const dispatch = useAppDispatch();

  //
  // Sub-Functions
  //
  const getFilteredCompendium = ({
    // Obtenemos los valores search y region de sus estados.
    search = compendiumState.search,
    category = compendiumState.category,
  }) => {
    // Creamos searchString como una Expresión Regular que sea case insensitive,
    // es decir, 'i'.
    const searchString = new RegExp(search, 'i');

    let filteredCompendiumByCategory: TypeBOTWCompendiumArray =
      compendiumState.compendiumArray;

    // Establecemos casos para cada categoría seleccionada.
    switch (category) {
      case 'All': {
        filteredCompendiumByCategory = compendiumState.compendiumArray;
        break;
      }
      case 'Food': {
        filteredCompendiumByCategory = compendiumState.compendium?.data
          .creatures.food as TypeBOTWCompendiumArray;
        break;
      }
      case 'Non_Food': {
        filteredCompendiumByCategory = compendiumState.compendium?.data
          .creatures.non_food as TypeBOTWCompendiumArray;
        break;
      }
      case 'Equipment_Axes': {
        filteredCompendiumByCategory =
          compendiumState.compentiumEqAxesArray as TypeBOTWCompendiumArray;
        break;
      }
      case 'Equipment_Arrows': {
        filteredCompendiumByCategory =
          compendiumState.compentiumEqArrowsArray as TypeBOTWCompendiumArray;
        break;
      }
      case 'Equipment_Blades': {
        filteredCompendiumByCategory =
          compendiumState.compentiumEqBladesArray as TypeBOTWCompendiumArray;
        break;
      }
      case 'Equipment_Blunt': {
        filteredCompendiumByCategory =
          compendiumState.compentiumEqBluntArray as TypeBOTWCompendiumArray;
        break;
      }
      case 'Equipment_Bows': {
        filteredCompendiumByCategory =
          compendiumState.compentiumEqBowsArray as TypeBOTWCompendiumArray;
        break;
      }
      case 'Equipment_Hammers': {
        filteredCompendiumByCategory =
          compendiumState.compentiumEqHammersArray as TypeBOTWCompendiumArray;
        break;
      }
      case 'Equipment_Long': {
        filteredCompendiumByCategory =
          compendiumState.compentiumEqLongArray as TypeBOTWCompendiumArray;
        break;
      }
      case 'Equipment_Non_Combat': {
        filteredCompendiumByCategory =
          compendiumState.compentiumEqNonCombatArray as TypeBOTWCompendiumArray;
        break;
      }
      case 'Equipment_Rods': {
        filteredCompendiumByCategory =
          compendiumState.compentiumEqRodsArray as TypeBOTWCompendiumArray;
        break;
      }
      case 'Equipment_Throwing': {
        filteredCompendiumByCategory =
          compendiumState.compentiumEqThrowingArray as TypeBOTWCompendiumArray;
        break;
      }
      case 'Equipment_Shields': {
        filteredCompendiumByCategory =
          compendiumState.compentiumEqShieldsArray as TypeBOTWCompendiumArray;
        break;
      }
      case 'Materials': {
        filteredCompendiumByCategory = compendiumState.compendium?.data
          .materials as TypeBOTWCompendiumArray;
        break;
      }
      case 'Monsters': {
        filteredCompendiumByCategory = compendiumState.compendium?.data
          .monsters as TypeBOTWCompendiumArray;
        break;
      }
      case 'Treasure': {
        filteredCompendiumByCategory = compendiumState.compendium?.data
          .treasure as TypeBOTWCompendiumArray;
        break;
      }
    }

    // Generamos filteredCompendium y lo devolvemos.
    const filteredCompendium = filteredCompendiumByCategory
      ? (filteredCompendiumByCategory.filter(
          (cElement: TypeCompendiumElement) => {
            // Filtramos propiamente el compendio y los devolvemos.
            return searchString.test(cElement.name);
          },
        ) as TypeBOTWCompendiumArray)
      : ([] as TypeBOTWCompendiumArray);

    return filteredCompendium;
  };

  const handleOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
    // Actualiza el cambio en Región en el estado y luego actualiza el estado de
    // filtered para que lo muestre al renderizar en su correspondiente componente.

    // Deconstruyendo el objeto de evento para obtener el valor que usario eligio
    const {
      target: { value },
    } = event;

    // El valor lo agrego al estado global y lo asigno a propiedad region
    dispatch(setCategory(value as TypeCategory));

    // utilizando la funcion de ayuda (helper functions) filtramos el array de countries
    // y devolvemos solo los paises que cumplan el filtro.
    const filteredCompendium = getFilteredCompendium({
      category: value,
    }) as TypeBOTWCompendiumArray;

    // Informamos que hay un cambio de estado, ergo, re renderiza/pinta
    dispatch(setElementsToRender(filteredCompendium));
  };

  const handleKeyUp = (event: ChangeEvent<HTMLInputElement>) => {
    // Actualiza el cambio en Search en el estado y luego actualiza el estado de
    // filtered para que lo muestre al renderizar en su correspondiente componente.

    // Deconstruyendo el objeto de evento para obtener el valor que usario tipeo
    let {
      target: { value },
    } = event;
    // El valor lo agrego al estado global y lo asigno a propiedad search
    // También impido que contenga cualquier signo que no sea el guión para evitar
    // las inyecciones de código.
    value = value.replace(/[~`!@#$%^&()_={}[\]:;,.<>+/?]/g, '');
    dispatch(setSearch(value));

    // utilizando la funcion de ayuda (helper functions) filtramos el array de countries
    // y devolvemos solo los paises que cumplan el filtro
    const filteredCompendium = getFilteredCompendium({
      search: value,
    }) as TypeBOTWCompendiumArray;

    // Informamos que hay un cambio de estado, ergo, re renderiza/pinta
    dispatch(setElementsToRender(filteredCompendium));
  };

  const setReset = () => {
    // Función que resetea los valores de los campos y devuelve como elementos a
    // renderizar la tabla generada anteriormente, sin tener que volver a pedirla
    // a la API, recargar la página o cambiar los datos a mano.
    dispatch(setCategory('All'));
    dispatch(setSearch(''));
    dispatch(setElementsToRender(compendiumState.compendiumArray));
  };

  //
  // Main
  //

  // Generamos un prompt para mostrar el número de elementos a renderizar.
  let promptString = '';
  if (
    compendiumState.elementsToRender &&
    compendiumState.elementsToRender?.length > 0
  ) {
    promptString =
      'Found ' + compendiumState.elementsToRender?.length + ' elements';
  } else {
    promptString = 'No matches found';
  }

  return (
    <StyledSection>
      <h1>Vade Mecum</h1>
      <form>
        <label htmlFor="categories">Categories</label>
        <select
          name="categories"
          id="categories"
          value={compendiumState.category}
          onChange={handleOnChange}
        >
          <option value="All">All</option>
          <option value="Food">Creatures (food)</option>
          <option value="Non_Food">Creatures (non food)</option>
          <option value="Equipment_Axes">Equipment (Axes)</option>
          <option value="Equipment_Arrows">Equipment (Arrows)</option>
          <option value="Equipment_Blades">Equipment (Blades)</option>
          <option value="Equipment_Blunt">Equipment (Blunt)</option>
          <option value="Equipment_Bows">Equipment (Bows)</option>
          <option value="Equipment_Hammers">Equipment (Hammers)</option>
          <option value="Equipment_Long">Equipment (Spears)</option>
          <option value="Equipment_Non_Combat">Equipment (Non Combat)</option>
          <option value="Equipment_Rods">Equipment (Rods)</option>
          <option value="Equipment_Throwing">Equipment (Throwing)</option>
          <option value="Equipment_Shields">Equipment (Shields)</option>
          <option value="Materials">Materials</option>
          <option value="Monsters">Monsters</option>
          <option value="Treasure">Treasure</option>
        </select>
        <label htmlFor="search">Search</label>
        <input
          value={compendiumState.search}
          type="search"
          placeholder="Search (Only letters, numbers and hyphens)"
          onKeyUp={handleKeyUp}
          onChange={handleKeyUp}
          id="search"
          maxLength={25}
          onKeyPress={(e) => {
            e.key === 'Enter' && e.preventDefault();
          }}
        />
      </form>
      <StyledPanel>
        <p>{promptString}</p>
        <StyledResetButton title="Reset" type="button" onClick={setReset}>
          Reset
        </StyledResetButton>
      </StyledPanel>
    </StyledSection>
  );
};

export default CompendiumFilter;
