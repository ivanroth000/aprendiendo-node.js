const fs = require('node:fs')

//readdir te dice los archivos que hay en tal directorio
fs.readdir('.', (err, file)=>{ // el '.' representa al directorio actual
    if (err){
        console.log('Hubo un error:', err)
        return
    }
    file.forEach(file =>{
        console.log(file)
    })
})