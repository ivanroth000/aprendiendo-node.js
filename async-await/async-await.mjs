// La extensión del archivo va a tener que ser .mjs que es lo que soporta
// el async await en el cuerpo

import { readFile } from "node:fs/promises";

console.log('leyendo el primer archivo')

const text = await readFile('./async.txt', 'utf-8')
console.log('primer texto', text)

console.log('recien cumplimos la primer promesa')

const segundoTexto = await readFile('./2async.txt', 'utf-8')
console.log('segundo texto:', segundoTexto)

console.log('terminamos de hacer el async-await')