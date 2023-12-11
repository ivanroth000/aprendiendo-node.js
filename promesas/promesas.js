const fs = require("node:fs/promises"); // Le agregamos el promises

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
