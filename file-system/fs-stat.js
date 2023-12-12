const fs = require("node:fs"); // Obtiene las estadísticas de un archivo o carpeta

const stats = fs.statSync("./archivo.txt"); // En este caso lo hacemos de forma síncrona por eso el 'Sync'

console.log(
  stats.isFile(), // Si es un fichero
  stats.isDirectory(), // Si es un directorio
  stats.isSymbolicLink(), // Si es un enlace simbólico
  stats.size // Tamaño en bytes
);
