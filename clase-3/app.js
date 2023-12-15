const express = require("express");
const crypto = require('node:crypto') //Biblioteca nativa de node.js. En este caso lo usamos para crear un id random
const { validateMovie } = require('./movie.js')
const app = express();
app.use(express.json())
const movies = require("./movies.json");
app.disable("x-powered-by");

//GET para filtrar por genero
app.get("/movies", (req, res) => {
  const { genre } = req.query;
  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase()) //g es un parámetro que representa cada género individual en la lista de géneros de la película. g.toLowerCase() convierte el género a minúsculas. Luego, compara este género en minúsculas con el género solicitado (que también se ha convertido a minúsculas con genre.toLowerCase()). Si al menos un género en la lista de géneros de la película coincide con el género solicitado, la función devuelve true.
    );
    return res.json(filteredMovies);
  }
  res.json(movies);
});

//GET para filtrar por ID
app.get("/movies/:id", (req, res) => {
  const { id } = req.params; //Para poder pasarle diferentes ID
  const movie = movies.find((movie) => movie.id === id);
  if (movie) return res.json(movie);
  res.status(404).json({ message: "Movie not found" });
});

//POST
app.post('/movies', (req, res) => {
    result = validateMovie(req.body)

    if(result.error){
        return res.status(400).json({error: JSON.parse(result.error.message)})
    }

    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data
    }

    movies.push(newMovie) //No sería rest porque estamos guardando la info en la memoria en lugar de una base de datos

    res.status(201).json(newMovie)
})


const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`Server escuchando en el puerto: http://localhost:${PORT}`);
});
