const express = require("express");
const app = express();
const movies = require("./movies.json");
app.disable("x-powered-by");

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

app.get("/movies/:id", (req, res) => {
  const { id } = req.params; //Para poder pasarle diferentes ID
  const movie = movies.find((movie) => movie.id === id);
  if (movie) return res.json(movie);
  res.status(404).json({ message: "Movie not found" });
});

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`Server escuchando en el puerto: http://localhost:${PORT}`);
});
