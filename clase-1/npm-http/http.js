const http = require('node:http')

const server = http.createServer((req, res)=> {
    console.log('req recivida')
    res.end('Hola Mundo')
})

server.listen(0, () => { // El número que se pone ahí es el puerto del server, el 0 ayuda a que el server este en un puerto que no está siendo ocupado.
    console.log(`Server escuchando en puerto: http://localhost:${server.address().port}`) //${server.address().port sirva para que nos aparezca el puerto en el que está el server
})