// La forma para trabajar con async-await sin usar la extensión .mjs

// Se usa una función autoinvocada

/*
(
    () => {}
)()
*/

const {readFile} = require ('node:fs/promises');

(
    async() =>{
        console.log('leyendo el primer archivo')

const text = await readFile('./async.txt', 'utf-8')
console.log('primer texto:', text)

console.log('recien cumplimos la primer promesa')

const segundoTexto = await readFile('./2async.txt', 'utf-8')
console.log('segundo texto:', segundoTexto)

console.log('terminamos de hacer el async-await')
    }
)()

// Eso es igual que hacer:

async function init () {
    console.log('leyendo el primer archivo')

const text = await readFile('./async.txt', 'utf-8')
console.log('primer texto', text)

console.log('recien cumplimos la primer promesa')

const segundoTexto = await readFile('./2async.txt', 'utf-8')
console.log('segundo texto:', segundoTexto)

console.log('terminamos de hacer el async-await')
}
init()

// La diferencia es que la primera es anónima