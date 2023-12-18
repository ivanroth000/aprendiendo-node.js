const express = require ('express')
const ditto = require('../pokemon/ditto.json')

const app = express()
app.disable('x-power-by') //Para que en el navegador no aparezca que estamos usando express
const PORT = process.env.PORT ?? 1234

//El middleware es una función que se ejecuta entre la petición y la respuesta

app.use((req, res, next) => { //Podríamos poner una url al principio ej:app.use(/pokemon, (req, res, next) para que afecte solo a esa url.
// También podriamos hacer app.get, app.post, etc para que afecte a las peticiones con determinado método
    console.log('mi primer middleware')
    next()
})

app.get('/pokemon/ditto', (req, res) => {
    //Esta función responde cuando se hace un GET en la ruta '/pokemon/ditto'
    //res.status(200).send('<h1> Hola mundo </h1>')// El 200 no haría falta porque es el valor por defecto
    res.json(ditto)//Para devolver json
})

app.post('/pokemon', (req, res) => {

    let body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    })
    req.on('end', () => {
        const data = JSON.parse(body)
        res.status(201).json(data)
    })
})
/*
ress.js. Aquí está lo que hace cada parte:

let body = '': Esto inicializa una variable body que se utilizará para almacenar los datos de la solicitud.

req.on('data', chunk => {...}): Esto adjunta un manejador de eventos al evento ‘data’ del objeto de solicitud req. Cada vez que se recibe un “trozo” de datos de la solicitud, este manejador de eventos se activa. El trozo de datos se convierte en una cadena y se añade a body.

req.on('end', () => {...}): Esto adjunta un manejador de eventos al evento ‘end’ del objeto de solicitud req. Este evento se activa cuando se han recibido todos los datos de la solicitud. En este punto, body contiene la totalidad de los datos de la solicitud como una cadena.

const data = JSON.parse(body): Esto convierte la cadena body en un objeto JavaScript. La cadena body debe estar en formato JSON para que esto funcione. El objeto resultante se almacena en la variable data.

res.status(201).json(data): Esto envía una respuesta al cliente. La respuesta tiene un código de estado HTTP de 201, que indica que se ha creado un recurso con éxito. La respuesta también incluye los datos de la solicitud en formato JSON.
*/

// la última a la que va a llegar, ya que va por orden
// el 404 debería ir último antes del app.listen
app.use((req, res) => { 
    res.status(404).send('<h1>error 404</h1>')
  })

app.listen(PORT, () => {
    console.log(`Server escuchando en: http://localhost:${PORT}`);
})

//Ejemplo de middleware real:

app.use((req, res, next) => {
    if (req.method !== 'POST') return next()
    if (req.headers['content-type'] !== 'application/json') return next()
    
    //solo llegan request que son POST y que tienen el header Content-Type: application/json
    let body = ''
    
    //escuchar el evento data
    req.on('data', chunk => {
    body += chunk.toString()
    })
    
    req.on('end', () => {
    const data = JSON.parse(body)
    // mutar la request y meter la información en el req.body
    req.body = data
    next()
    })
    })

    app.post('/pokemon', (req, res) => {
        // req.body deberíamos guardar en bbdd
        res.status(201).json(req.body)
    })


    //Todo eso es lo mismo que hacer:
    app.use(express.json())//Viene de forma nativa por express

    app.post('/pokemon', (req, res) => {
        // req.body deberíamos guardar en bbdd
        res.status(201).json(req.body)
    })