# Read me

## Introducción

La idea de este proyecto es, dada esta [api](https://gadhagod.github.io/Hyrule-Compendium-API/#/), realizar una página usando React, Redux y cumpliendo los requisitos del curso realizado para **General Assembly**.

![Page Scaffolding](/info/assets/Project.png 'Page scaffolding')

Como puede apreciarse en la imagen, la idea es contar con una '_landing page_', la página de trabajo, que llamaremos '_chest_' y un '_about_' donde se informará debidamente del proyecto.

En _chest_, contaremos con un _drop-down_ donde podremos elegir el tipo de elemento que queremos ver y un cuadro de texto donde buscar palabras clave. Adicionalmente, y si el tiempo lo permite, trataremos de pormenorizar los datos en un segundo _drop-down_ que no forma parte de la api inicial y que requeriría compartimentarlo a mano. En el ejemplo de la imagen, el usuario ha seleccionado _swords_, que forma parte del equipo que podremos encontrar en el juego.

Las cuatro webs, siendo la cuarta dinámica y distinta para cada elemento que el usuario quiera ver, serán controladas por _React Router_. Se usará _React Helmet_ para generar un head independiente a cada página y _Styled Components_ para añadir estilos por componentes (como su nombre indica). Los Test, requeridos para el proyecto, también serán realizados con lo que ya viene incluido.
