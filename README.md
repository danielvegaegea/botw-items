# Read me

## Introducción

La idea de este proyecto es, dada esta [API](https://gadhagod.github.io/Hyrule-Compendium-API/#/), realizar una página usando React, Redux y cumpliendo los requisitos del curso realizado para **General Assembly**.

![Page Scaffolding](/info/assets/Project.png 'Page scaffolding')

Como puede apreciarse en la imagen, la idea es contar con una '_landing page_', la página de trabajo, que llamaremos '_chest_' y un '_about_' donde se informará debidamente del proyecto.

(Nota: _chest_ ha sido renombrada a _Vade Mecum_.)

En _Vade Mecum_, veremos un listado completo de los elementos que aparecen en la _API_ y contaremos con un _drop-down_ donde podremos elegir el tipo de elemento que queremos ver y un _cuadro de texto_ donde buscar palabras clave. Adicionalmente, y si el tiempo lo permite, trataremos de añadir secciones de equipamiento pormenorizadas en el _drop-down_ que no forman parte de la _API_ inicial y que requeriría compartimentarlo a mano. En el ejemplo de la imagen, el usuario ha seleccionado _swords_, que forma parte del equipo que podremos encontrar en el juego.

El proyecto se desarrolla en [React](https://es.reactjs.org/) con [TypeScript](https://www.typescriptlang.org/es/) desde [Create React App](https://create-react-app.dev/) y usa [React Redux Toolkit](https://redux-toolkit.js.org/) para poder pasar información de una forma más cómoda entre componentes. Las cuatro webs, siendo la cuarta dinámica y distinta para cada elemento que el usuario quiera ver, serán controladas por [React Router](https://v5.reactrouter.com/). Se usará [React Helmet](https://www.npmjs.com/package/react-helmet) para generar un head independiente a cada página y [Styled Components](https://styled-components.com/) para añadir estilos por componentes (como su nombre indica). Los Test, requeridos para el proyecto, también serán realizados con lo que ya viene incluido. La codificación de todo el proyecto hará usando [Visual Studio Code](https://code.visualstudio.com/).

Se ha utilizado [React-Markdown](https://www.npmjs.com/package/react-markdown) para poder redactar contenido en la página sin tener que recurrir al engorroso método manual. En cualquier caso, se pretende dejar una sección pormennorizada de los elementos utilizados dentro de _about_ en la propia página.

Adicionalmente, destacar que se ha protegido el _cuadro de búsqueda_ para que no pueda inyectarse código por cuestiones de seguridad. También se han cubierto las rutas erroneas, tanto las de páginas como las posibles entradas erroneas desde el _Vade Mecum_.

Inicialmente, pretendía usar [React Helmet](https://www.npmjs.com/package/react-helmet), pero el proyecto se ha desarrollado en [TypeScript](https://www.typescriptlang.org/es/) y Helmet ya ha dejado de sar actualizado por lo que usé la versión _Async_ indicado. También he tratado de usar [MDX-Js - Markdown for the Component Era](https://mdxjs.com/), pero resultó plantear demasiados problemas y, de todas formas, este proyecto no cuenta con demasiado texto como para justificar la inversión en tiempo. Se optó por usar [React-Markdown](https://www.npmjs.com/package/react-markdown), que funcionó sin problemas pese a ser más limitado.

Los principales problemas que he encontrado en el desarrollo del proyecto se han definido en conseguir que los distintos elementos utilizados se "_lleven bien unos con otros_" y no se produzcan fallos indeseados, a veces ni siquiera detectables en producción.

React y su entorno se comportan como un ente vivo, en constante crecimiento y evolución. A veces cuesta encontrar documentación actualizada y acomodarse a los distintos cambios. Aun así, sus equipos son profesionales y, entre unos y otros, he conseguido ir superando los distintos obstáculos.

Una vez conseguido el _scaffolding_ de la página, todo ha ido bastante rápido y sin demasiados problemas. La decisión de usar TypeScript se ha tomado por dos razones. En primer lugar para añadir algo de desafío a este proyecto, en segundo lugar porque, a mi entender, es una forma mucho más adecuada de trabajar, por engorrosa que pueda resultar a veces. Controlar bien las variables es una magnífica medida para prevenir en la medida de lo posible los ataques externos y es por ello que también se ha bloqueado la única vía de comunicación por parte del usuario de esta web, que no es otra que el cuadro de diálogo _search_. Dudo que pueda decirse que esta página es inespugnable, pero también dudo que pueda decirse de ninguna.

Las secciones de equipamiento pormenorizadas se han podido añadir y además se ha implementado una memoria que almacena la búsqueda que el usuario había realizado al hacer click en un elemento y flechas que permiten ir al _siguiente_ o _anterior_ elemento basándonos en su _ID_ o volver al _Vade Mecum_ con nuestras opciones guardadas. Si no deseamos reutilizar nuestra anterior búsqueda, se ha añadido un boton de **Reset** que, además, no requiere recargar datos porque usa las _array_ previamente creadas y deja la categoría y campo de búsqueda a sus valores por defecto. También se ha controlado la posibilidad se superar la última _id_ (389) y nos lleva a la primera si pulsamos _siguiente_. El último elemento lo he obtenido del array, pero he dejado el número _hardcodeado_ en caso de que no se tuviera acceso a la misma por si a un usuario se le ocurre guardar como bookmark una página de elemento. Este juego tiene ya algunos años y es poco probable que la _API_ se actualice.

Por último, se ha añadido un _prompt_ que nos muestra el número de elementos a nuestra disposición, dependiendo claro está de los parámetros de búsqueda que hayamos introducido. Incluso se ha controlado el hecho de que no haya resultados, obteniendo un "_No hay coincidencias_" en lugar de "_Hay 0 elementos_".

Aparte del problema con el scaffolding, el otro gran obstáculo lo he encontrado a la hora de obtener y preparar los elementos. Esta _API_ no genera una simple tabla, sino una estructura dividida en categorías, lo que representa un problema para renderizar todos los elementos. Es por ello que se ha creado un _array_ elaborada a partir de los datos obtenidos de la _API_ y con ella también los _array_ de las distintas categorías.

La página se colgará en [netlify](https://www.netlify.com/) y este es su [enlace](https://tloz-botw-compendium.netlify.app/).
