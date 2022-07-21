import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import styled from 'styled-components';

import {
  selectCompendium,
  setCategory,
  setElementsToRender,
  setSearch,
} from '../features/hyruleCompendium/hyruleCompendiumSlice';

import {
  TypeBOTWCompendiumArray,
  TypeCompendiumElement,
  TypeCategory,
} from '../types';

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
`;

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

  return (
    <StyledSection>
      <h1>Vade Mecum</h1>
      <form>
        <label htmlFor="categories">Categories</label>
        <select name="categories" id="categories" onChange={handleOnChange}>
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
    </StyledSection>
  );
};

export default CompendiumFilter;
