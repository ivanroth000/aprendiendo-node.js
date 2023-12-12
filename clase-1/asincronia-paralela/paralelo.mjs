import { readFile } from "node:fs/promises";

console.log("todavia no tenemos promesas");

Promise.all([
  readFile("./paralelo.txt", "utf-8"),
  readFile("./paralelo2.txt", "utf-8"),
]).then(([texto, segundoTexto]) => {
  console.log("Este es el primer texto:", texto);
  console.log("Segundo texto:", segundoTexto);
});

console.log("terminamos las promesas");

//Esta forma paralela lee las líneas el mismo tiempo y devuelve sin importar el orden
//Es más rápido que el async-await