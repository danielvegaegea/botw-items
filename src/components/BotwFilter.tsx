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
  // Generates an array with all 389 elements from the compendium and stores it in
  // BOTWCompendiumArray for use in the "all" category.
  const compendiumState = useAppSelector(selectCompendium);
  const dispatch = useAppDispatch();

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
      case 'Equipment': {
        filteredCompendiumByCategory = compendiumState.compendium?.data
          .equipment as TypeBOTWCompendiumArray;
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

  const handleOnPreviousChange = () => {
    console.log('handleprevious');
    // utilizando la funcion de ayuda (helper functions) filtramos el array de countries
    // y devolvemos solo los paises que cumplan el filtro.
    let filteredCompendium = getFilteredCompendium({
      category: compendiumState.category,
    }) as TypeBOTWCompendiumArray;

    filteredCompendium = getFilteredCompendium({
      search: compendiumState.search,
    }) as TypeBOTWCompendiumArray;

    console.log(filteredCompendium);
    // Informamos que hay un cambio de estado, ergo, re renderiza/pinta
    dispatch(setElementsToRender(filteredCompendium));
  };

  const setReset = () => {
    window.location.reload();
  };

  let searchPreviousValue, categoryPreviousValue;
  searchPreviousValue = compendiumState.search;
  categoryPreviousValue = compendiumState.category;
  useEffect(() => {
    if (compendiumState.search !== '' || compendiumState.category !== 'All') {
      handleOnPreviousChange();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* else {
    searchPreviousValue = '';
  }
  if (compendiumState.category !== "All") {
    categoryPreviousValue = compendiumState.category;
  } else {
    categoryPreviousValue = "All";
  } */

  return (
    <StyledSection>
      <h1>Vade Mecum</h1>
      <form>
        <label htmlFor="categories">Categories</label>
        <select
          name="categories"
          id="categories"
          defaultValue={categoryPreviousValue}
          onChange={handleOnChange}
        >
          <option value="All">All</option>
          <option value="Food">Creatures (food)</option>
          <option value="Non_Food">Creatures (non food)</option>
          <option value="Equipment">Equipment</option>
          <option value="Materials">Materials</option>
          <option value="Monsters">Monsters</option>
          <option value="Treasure">Treasure</option>
        </select>
        <label htmlFor="search">Search</label>
        <input
          defaultValue={searchPreviousValue}
          type="search"
          placeholder="Search (Only letters, numbers and hyphens)"
          onKeyUp={handleKeyUp}
          id="search"
          maxLength={25}
          onKeyPress={(e) => {
            e.key === 'Enter' && e.preventDefault();
          }}
        />
      </form>
      <StyledPanel>
        <p>Found: {compendiumState.elementsToRender?.length} elements</p>
        <StyledResetButton title="Reset" type="button" onClick={setReset}>
          Reset
        </StyledResetButton>
      </StyledPanel>
    </StyledSection>
  );
};

export default CompendiumFilter;
