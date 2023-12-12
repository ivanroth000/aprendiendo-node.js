//Nos permite crear nuevas rutas de archivos, saber si un archivo tiene extensiones,
//recuperar la extensión, crear rutas absolutas y muchas cosas más.

const path = require ('node:path')

//No se deberían crear rutas porque los sistemas operativos tienen distintas formas
//de escribir el path


//Sep te dice como es la separación de carpetas según os
console.log(path.sep)


//Podemos unir rutas con path.join, esta sería la forma correcta de 'crear' rutas
const ruta = path.join('monumental', 'cancha', 'river')
console.log(ruta) //En windows devuelve monumental\cancha\river


//basename te dice el nombre de un archivo con o sin la extensión
//Con la extensión
const nombreArchivo = path.basename('/monumental/cancha/river.txt')
console.log(nombreArchivo)
//Sin la extensión
const nombreArchivoSinExtension = path.basename('/monumental/cancha/river.txt','.txt')
console.log(nombreArchivoSinExtension)


//extname te da la extensión de un archivo
const extension = path.extname('image.jpg')
console.log(extension)



