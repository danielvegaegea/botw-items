// React
import { ChangeEvent } from 'react';
// Redux
import { useAppDispatch, useAppSelector } from '../app/hooks';
// Styled Components
import styled from 'styled-components';
// Compendium Slyce
import {
  selectCompendiumMaster,
  setElementsToRender,
  setSearch,
} from '../features/hyruleCompendiumMaster/hyruleCompendiumMasterSlice';
// Types
import { TypeBOTWCompendiumArray, TypeCompendiumElement } from '../types';

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
      color: #595555;
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
const CompendiumMasterFilter = () => {
  // Default
  // Genera un array con todos los 389 elementos del compendio y los almacena en
  // BOTWCompendiumArray para ser usados en la categoróa "All".
  const compendiumMasterState = useAppSelector(selectCompendiumMaster);
  const dispatch = useAppDispatch();

  //
  // Sub-Functions
  //
  const getFilteredCompendium = ({
    // Obtenemos los valores search y region de sus estados.
    search = compendiumMasterState.search,
  }) => {
    // Creamos searchString como una Expresión Regular que sea case insensitive,
    // es decir, 'i'.
    const searchString = new RegExp(search, 'i');

    // Generamos filteredCompendium y lo devolvemos.
    const filteredCompendium = compendiumMasterState.compendiumMasterArray
      ? (compendiumMasterState.compendiumMasterArray.filter(
          (cElement: TypeCompendiumElement) => {
            // Filtramos propiamente el compendio y los devolvemos.
            return searchString.test(cElement.name);
          },
        ) as TypeBOTWCompendiumArray)
      : ([] as TypeBOTWCompendiumArray);

    return filteredCompendium;
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

    // utilizando la funcion de ayuda (helper functions) filtramos el array del compendio
    // y devolvemos solo los elementos que cumplan el filtro
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
    dispatch(setSearch(''));
    dispatch(setElementsToRender(compendiumMasterState.compendiumMasterArray));
  };

  //
  // Main
  //

  // Generamos un prompt para mostrar el número de elementos a renderizar.
  let promptString = '';
  if (
    compendiumMasterState.elementsToRender &&
    compendiumMasterState.elementsToRender?.length > 0
  ) {
    promptString =
      'Found ' + compendiumMasterState.elementsToRender?.length + ' elements';
  } else {
    promptString = 'No matches found';
  }

  return (
    <StyledSection>
      <h1>Master Vade Mecum</h1>
      <form>
        <label htmlFor="categories">Categories</label>
        <select
          name="categories"
          id="categories"
          value={'Monsters'}
          disabled={true}
          /* onChange={handleOnChange} */
        >
          <option value="Monsters">Monsters (Blocked)</option>
        </select>
        <label htmlFor="search">Search</label>
        <input
          value={compendiumMasterState.search}
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

export default CompendiumMasterFilter;
