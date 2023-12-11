/*

Variables Globales:
En Node.js no esta el atributo windows que hay en js, en su defectos tenemos
globalThis, la cual es una variable global en toda nuestra aplicación.

*/
//console.log(globalThis)

//Sistema de modulos CommonJS, sirve para exportar e importar código:

// Commond Require Module
const { suma } = require("./suma");

console.log(suma(2, 4));

//Esa es la forma clásica pero no se utiliza tanto en la actualidad

//Hoy en día se usa más el export antes de la función y luego importarlo.
//Para hacer esto, los archivos tienen que tener la extensión mjs, es decir
//en vez de index.js hacemos index.mjs

//Módulos Nativos:

const os = require("node:os"); //os nos da info del sistema operativo
// También se podría hacer const os = require ('os') pero ya no se recomienda
console.log(os.platform()); //te da la versión del sistema operativo (win32)

/*
También podríamos hacer:
import {platform} from 'node:os' o import os from 'node:os' si queremos todo de os
si la extensión del archivo fuese .mjs
*/
