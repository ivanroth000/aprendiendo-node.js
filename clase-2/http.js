const http = require("node:http"); // protocolo HTTP
const fs = require("node:fs");

const desiredPort = process.env.PORT ?? 1234;

const processRequest = (req, res) => {
res.setHeader("Content-Type", "text/html; charset=utf-8");

if (req.url === "/") {
    res.end("<h1>Mi página</h1>");

} else if (req.url === "/imagen-super-bonita.png") {//La url del navegador
    fs.readFile("./placa.png", (err, data) => {//El path de la img
    if (err) {
        res.statusCode = 500;
        res.end("<h1>500 Internal Server Error</h1>");
    } else {
        res.setHeader("Content-Type", "image/png");//seteamos el header del navegador y le decimos que es una img png
        res.end(data);// Muestra la data
    }
    });

} else if (req.url === "/contacto") {
    res.end("<h1>Contacto</h1>");
} else {
    res.statusCode = 404; // Not Found
    res.end("<h1>404</h1>");
}
};

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`)
})

//Para que se reinicie la página automáticamente ponemos en la terminal
// node --watch 'nombre del archivo que queres levantar'
//Una alternativa es bajarse nodemon (npm i nodemon -D)

//STATUS CODE:
// 100-199 respuestas informativas
// 200-299 respuestas satisfactorias
// 300-399 redirecciones
// 400-499 errores del cliente
// 500-599 errores del servidor
