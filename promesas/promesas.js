const fs = require("node:fs/promises"); // Le agregamos el promises
/*
Si quisieramos usar promesas pero en const fs = require ('node:fs') no tenemos
/promises porque esa versión no lo soporta podemos usar:
const {promisify} = require ('node:util')
const readFilePromise = promisify(fs.readFile)
y reemplazamos los fs.readFile por fs.readFilePromise
*/


// Forma asíncrona
console.log("no hay promesas aun");

fs.readFile("./promesas.txt", "utf-8").then(text => {
  console.log("primer texto:", text);
});

console.log("analizando dsp de la primer promesa");

fs.readFile("./2promesas.txt", "utf-8").then(text => {
  console.log("segundo texto:", text);
});

console.log("terminaron las promesas");
