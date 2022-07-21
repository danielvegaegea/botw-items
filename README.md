# Read me

## Introducción

La idea de este proyecto es, dada esta [api](https://gadhagod.github.io/Hyrule-Compendium-API/#/), realizar una página usando React, Redux y cumpliendo los requisitos del curso realizado para **General Assembly**.

![Page Scaffolding](/info/assets/Project.png 'Page scaffolding')

Como puede apreciarse en la imagen, la idea es contar con una '_landing page_', la página de trabajo, que llamaremos '_chest_' y un '_about_' donde se informará debidamente del proyecto.

(Nota: _chest_ ha sido renombrada a _Vade Mecum_.)

En _Vade Mecum_, veremos un listado completo de los elementos que aparecen en la _API_ y contaremos con un _drop-down_ donde podremos elegir el tipo de elemento que queremos ver y un _cuadro de texto_ donde buscar palabras clave. Adicionalmente, y si el tiempo lo permite, trataremos de añadir secciones de equipamiento pormenorizadas en el _drop-down_ que no forman parte de la _API_ inicial y que requeriría compartimentarlo a mano. En el ejemplo de la imagen, el usuario ha seleccionado _swords_, que forma parte del equipo que podremos encontrar en el juego.

Las cuatro webs, siendo la cuarta dinámica y distinta para cada elemento que el usuario quiera ver, serán controladas por **React Router**. Se usará **React Helmet** para generar un head independiente a cada página y **Styled Components** para añadir estilos por componentes (como su nombre indica). Los Test, requeridos para el proyecto, también serán realizados con lo que ya viene incluido.

Se ha utilizado **React Markdown** para poder redactar contenido en la página sin tener que recurrir al engorroso método manual. En cualquier caso, se pretende dejar una sección pormennorizada de los elementos utilizados dentro de _about_ en la propia página.

Adicionalmente, destacar que se ha protegido el _cuadro de búsqueda_ para que no pueda inyectarse código por cuestiones de seguridad. También se han cubierto las rutas erroneas, tanto las de páginas como las posibles entradas erroneas desde el _Vade Mecum_.
