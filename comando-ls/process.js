//process es un objeto global que proporciona información y control
//sobre el proceso actual de ejecución, permite interactuar con el entorno
//de ejecución de node.js

console.log(process.argv)
//Devuelve un array con toda la línea de comandos, que serían los argumentos

process.exit(0) //Podemos controlar cómo salir del proceso
//con 0 es que todo salió bien y el proceso tiene que terminar ahí
//con 1 es que a habido algún error y queremos que salga

process.on('exit', () =>{
    //limpiar la consola
})
//Controlamos eventos del proceso

console.log(process.cwd)//Current working directory
//Nos dice desde que carpeta estamos ejecutando el proceso

//Variables de entorno
console.log(process.env.PEPITO)//PEPITO es la variable de entorno que le estamos pasando