const fs = require ('node:fs')

// Forma síncrona
const text = fs.readFileSync('./archivo.txt', 'utf-8') 
// readFile es para leer un archivo
// El utf-8 es para que nos devuelva la información de una forma que podamos entender
console.log(text)


// Forma asíncrona
fs.readFile('./archivo.txt', 'utf-8', (err, text)=>{ // <== Ejecutas este callback
    console.log(text)
})

/*
Si quisieramos usar promesas pero en const fs = require ('node:fs') no tenemos
/promises porque esa versión no lo soporta podemos usar:
const {promisify} = require ('node:util')
const readFilePromise = promisify(fs.readFile)
*/