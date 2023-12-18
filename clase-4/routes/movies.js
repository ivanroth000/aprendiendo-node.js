//Creamos rutas para organizar el archivo
//El nombre es movies.js porque 'movies' será la ruta de la rest api
import { validateMovie, validatePartialMovie } from '../../clase-3/movie'
import { Router } from "express";
import { readJSON } from "../util";
export const moviesRouter = Router()
const movies = readJSON('../../clase-3/movies.json')
import { randomUUID } from 'node:crypto'

moviesRouter.get('/', (req, res) => {
    const { genre } = req.query;
  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase()) //g es un parámetro que representa cada género individual en la lista de géneros de la película. g.toLowerCase() convierte el género a minúsculas. Luego, compara este género en minúsculas con el género solicitado (que también se ha convertido a minúsculas con genre.toLowerCase()). Si al menos un género en la lista de géneros de la película coincide con el género solicitado, la función devuelve true.
    );
    return res.json(filteredMovies);
  }
  res.json(movies);
})

moviesRouter.get('/:id', (req, res) => {
    const { id } = req.params; //Para poder pasarle diferentes ID
  const movie = movies.find((movie) => movie.id === id);
  if (movie) return res.json(movie);
  res.status(404).json({ message: "Movie not found" });
})

moviesRouter.post('/', (req, res) => {
    const result = validateMovie(req.body)

    if(result.error){
        return res.status(400).json({error: JSON.parse(result.error.message)})
    }

    const newMovie = {
        id: randomUUID(),
        ...result.data
    }

    movies.push(newMovie) //No sería rest porque estamos guardando la info en la memoria en lugar de una base de datos

    res.status(201).json(newMovie)
})

moviesRouter.patch('/', (req, res) => {
    const result = validatePartialMovie(req.body)
  if(result.error){
    return res.status(404).json({error: JSON.parse(result.error.message)})
  }

  const {id} = req.params //Extrae el ID de la película de los parámetros de la ruta.
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if(movieIndex === -1){
    return res.status(404).json({message: 'movie not found'})
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data //Esto crea un nuevo objeto de película combinando la película existente con los datos de actualización. Los datos de actualización sobrescribirán las propiedades correspondientes en la película existente.
  }
    movies[movieIndex] = updateMovie //Actualiza la película en el array movies.
    return res.json(updateMovie)
})