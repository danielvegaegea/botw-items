import { ChangeEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';

import {
  selectCompendium,
  setElementsInArray,
  setCategory,
  setElementsToRender,
  setSearch,
} from '../features/hyruleCompendium/hyruleCompendiumSlice';

import {
  T_BOTWCompendiumArray,
  T_CompendiumElement,
  T_Category,
} from '../types';

const CompendiumFilter = () => {
  // Generates an array with all 389 elements from the compendium and stores it in
  // BOTWCompendiumArray for use in the "all" category.

  const compendiumState = useAppSelector(selectCompendium);
  const dispatch = useAppDispatch();
  const { error } = useAppSelector(selectCompendium);

  const makeCompendiumArray = () => {
    const compendiumData = compendiumState.compendium
      ? compendiumState.compendium?.data
      : null;

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
    console.log('OK Array');
    completeArray && console.log(completeArray);
    dispatch(setElementsInArray(completeArray));
    //miArray && console.log('miArray');
    //miArray && console.log(miArray);
  };

  useEffect(() => {
    makeCompendiumArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  /* useEffect(() => {
    dispatch(setElementsToRender(compendiumState.compendiumArray));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);
 */
  const getFilteredCompendium = ({
    // Obtenemos los valores search y region de sus estados.
    search = compendiumState.search,
    category = compendiumState.category,
  }) => {
    // Creamos searchString como una Expresión Regular que sea case insensitive,
    // es decir, 'i'.
    const searchString = new RegExp(search, 'i');

    const filteredCompendium = compendiumState.compendiumArray
      ? (compendiumState.compendiumArray.filter(
          (cElement: T_CompendiumElement) => {
            // Filtramos propiamente el compendio y los devolvemos.
            return (
              (searchString.test(cElement.name) &&
                cElement.category === category) ||
              category === 'All'
            );
          },
        ) as T_BOTWCompendiumArray)
      : ([] as T_BOTWCompendiumArray);
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
    dispatch(setCategory(value as T_Category));

    // utilizando la funcion de ayuda (helper functions) filtramos el array de countries
    // y devolvemos solo los paises que cumplan el filtro.
    const filteredCompendium = getFilteredCompendium({
      category: value,
    }) as T_BOTWCompendiumArray;

    // Informamos que hay un cambio de estado, ergo, re renderiza/pinta
    dispatch(setElementsToRender(filteredCompendium));
  };

  const handleKeyUp = (event: ChangeEvent<HTMLInputElement>) => {
    // Actualiza el cambio en Search en el estado y luego actualiza el estado de
    // filtered para que lo muestre al renderizar en su correspondiente componente.

    // Deconstruyendo el objeto de evento para obtener el valor que usario tipeo
    const {
      target: { value },
    } = event;
    // El valor lo agrego al estado global y lo asigno a propiedad search
    dispatch(setSearch(value));

    // utilizando la funcion de ayuda (helper functions) filtramos el array de countries
    // y devolvemos solo los paises que cumplan el filtro
    const filteredCompendium = getFilteredCompendium({
      search: value,
    }) as T_BOTWCompendiumArray;

    // Informamos que hay un cambio de estado, ergo, re renderiza/pinta
    dispatch(setElementsToRender(filteredCompendium));
  };

  return (
    <header>
      <h1>Compendium</h1>
      <form>
        <label htmlFor="categories">Categories</label>
        <select name="categories" id="categories" onChange={handleOnChange}>
          <option value="all">All</option>
          <option value="food">Creatures (food)</option>
          <option value="non_food">Creatures (non food)</option>
          <option value="equipment">Equipment</option>
          <option value="materials">Materials</option>
          <option value="monsters">Monsters</option>
          <option value="treasure">Treasure</option>
        </select>
        <label>Seach</label>
        {/* <input type="search" placeholder="search" /> */}
        <input type="search" placeholder="search" onKeyUp={handleKeyUp} />
      </form>
    </header>
  );
};

export default CompendiumFilter;

/*
+import { useEffect } from 'react';
+import { useAppDispatch, useAppSelector } from '../app/hooks';
+
+import {
+  selectCompendium,
+  setCategory,
+  setElementsToRender,
+  setSearch,
+} from '../features/hyruleCompendium/hyruleCompendiumSlice';
+
+import { BOTWCompendiumResponseData } from '../types';
+
+const CompendiumFilter = () => {
+  const compendiumState = useAppSelector(selectCompendium);
+  const dispatch = useAppDispatch();
+
+  /*   const getFilteredCompendium = ({
+    // Obtenemos los valores search y region de sus estados.
+    search = compendiumState.search,
+    region = compendiumState.region,
+  }) => {
+    // Creamos searchString como una Expresión Regular que sea case insensitive,
+    // es decir, 'i'.
+    const searchString = new RegExp(search, 'i');
+
+    const filteredCountries = compendiumState.countries.filter((country) => {
+      // Obtenemos el nativeName (de haberlo)
+      let nativeName;
+      if (country.name.nativeName !== undefined) {
+        nativeName =
+          country.name.nativeName[Object.keys(country.name.nativeName)[0]]
+            .common;
+      } else {
+        nativeName = country.name.common;
+      }
+
+      // Filtramos propiamente los paises y los devolvemos.
+      // Aladido el filtro de nativeName además del name.
+      return (
+        (searchString.test(country.name.common) ||
+          searchString.test(nativeName)) &&
+        (country.region === region || region === 'All')
+      );
+    });
+    return filteredCountries;
+  }; 
+
+  /* const handleOnChange = (event) => {
+    // Actualiza el cambio en Región en el estado y luego actualiza el estado de
+    // filtered para que lo muestre al renderizar en su correspondiente componente.
+
+    // Deconstruyendo el objeto de evento para obtener el valor que usario eligio
+    const {
+      target: { value },
+    } = event;
+
+    // El valor lo agrego al estado global y lo asigno a propiedad region
+    dispatch(setRegion(value));
+
+    // utilizando la funcion de ayuda (helper functions) filtramos el array de countries
+    // y devolvemos solo los paises que cumplan el filtro.
+    const filteredCountries = getFilteredCountries({
+      region: value,
+    });
+
+    // Informamos que hay un cambio de estado, ergo, re renderiza/pinta
+    dispatch(setCountriesToRender(filteredCountries));
+  }; 
+
+  /* const handleKeyUp = (event) => {
+    // Actualiza el cambio en Search en el estado y luego actualiza el estado de
+    // filtered para que lo muestre al renderizar en su correspondiente componente.
+
+    // Deconstruyendo el objeto de evento para obtener el valor que usario tipeo
+    const {
+      target: { value },
+    } = event;
+    // El valor lo agrego al estado global y lo asigno a propiedad search
+    dispatch(setSearch(value));
+
+    // utilizando la funcion de ayuda (helper functions) filtramos el array de countries
+    // y devolvemos solo los paises que cumplan el filtro
+    const filteredCountries = getFilteredCountries({
+      search: value,
+    });
+
+    // Informamos que hay un cambio de estado, ergo, re renderiza/pinta
+    dispatch(setCountriesToRender(filteredCountries));
+  }; 
+
+  // 1. renderiza
+  return (
+    <header>
+      <h1>Country flags</h1>
+      <form>
+        <label htmlFor="regions">Regions</label>
+        {/* 2. Espera que el evento change pase, si pasa dispara la funcion que esta
+           asociada como valor al evento en sintaxis JSX.
+
+            elemento.addEventlistener('change', handleOnChange)
+        }
+        <select name="regions" id="categories">
+          {/* <select name="regions" id="regions" onChange={handleOnChange}></select> *
+          <option>All</option>
+          <option>Creatures (food)</option>
+          <option>Creatures (non food)</option>
+          <option>Equipment</option>
+          <option>Materials</option>
+          <option>Monsters</option>
+          <option>Treasure</option>
+        </select>
+        <label>Seach</label>
+        {/* 2 Espera que el evento keyup pase, si pasa dispara la funcion que esta asociada
+           como valor al evento en sintaxis JSX
+        }
+        <input type="search" placeholder="search" />
+        {/* <input type="search" placeholder="search" onKeyUp={handleKeyUp} /> }
+      </form>
+    </header>
+  );
+};
+
+export default CompendiumFilter;

*/
