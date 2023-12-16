//El CORS es un mecanismo que permite que se puedan solicitar recursos restringidos
//en una página web desde un dominio diferente del dominio que sirvió el primer recurso.

//Le falta una cabecera para que se arregle, se arregla en el backend

app.get("/movies", (req, res) => {

    res.header('Acces-Control-Allow-Origin', '*' ) //Esto permitiría que todos tengan acceso a la API gracias al *

    const { genre } = req.query;
    if (genre) {
      const filteredMovies = movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
      );
      return res.json(filteredMovies);
    }
    res.json(movies);
  });

  //También podemos personalizar qué sitios queremos que tengan acceso

  const ACCEPTED_ORIGINS = [
    'http://localhost:8080',
    'http://localhost:1234',
    'https://movies.com',
    'https://midu.dev'
  ] //Estos son los sitios permitidos que van a poder acceder a la API

  app.get("/movies", (req, res) => {

    const origin = req.header('origin')
    if (ACCEPTED_ORIGINS.includes(origin) || !origin){ //El !origin se pone porque si la solicitud viene del mismo origen, no te manda la cabecera (header), entonces de está forma se podrá permitir la solicitud si ésta viene del mismo origen
    res.header('Acces-Control-Allow-Origin', origin ) 
    }

    const { genre } = req.query;
    if (genre) {
      const filteredMovies = movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
      );
      return res.json(filteredMovies);
    }
    res.json(movies);
  });


  //Con DELETE es diferente.
  // métodos normales: GET/HEAD/POST
    // métodos complejos: PUT/PATCH/DELETE
    //con los métodos complejos se requiere la petición OPTION


  app.delete('/movies/:id', (req, res) => {
    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)
  
    if (movieIndex === -1) {
      return res.status(404).json({ message: 'Movie not found' })
    }
  
    movies.splice(movieIndex, 1)
  
    return res.json({ message: 'Movie deleted' })
  })

  app.options('/movies/:id', (req,res)=>{
    const origin = req.header('origin')
    if (ACCEPTED_ORIGINS.includes(origin) || !origin){
        res.header('Acces-Control-Allow-Origin', origin ) 
        res.header('Acces-Control-Allow-Origin', 'GET, PATCH, DELETE, POST' )
    }
    res.send(200)

  })

  //Hay una forma más sencilla, podemos instalar npm i cors -E

  const cors = require ('cors')
  app.use(cors()) //Por defecto te pone todo con el *

  //De todas formas podríamos personalizar eso:

  app.use(cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        'http://localhost:8080',
        'http://localhost:1234',
        'https://movies.com',
        'https://midu.dev'
      ]
  
      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true)
      }
  
      if (!origin) {
        return callback(null, true)
      } /* El primer argumento de callback es para pasar un error. Al pasar null, estás indicando que no hay ninguno.

      El segundo argumento de callback es un booleano que indica si el origen de la solicitud está permitido. Al pasar true, estás indicando que la solicitud está permitida */
  
      return callback(new Error('Not allowed by CORS'))
    }
  }))