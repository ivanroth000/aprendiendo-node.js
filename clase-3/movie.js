import {z} from 'zod' //Instalamos zod(npm i zod -E) y con esta z vamos a hacer las validaciones

const movieSchema = z.object({
    title: z.string({
        invalid_type_error: 'movie title must be a string',
        required_error: 'movie title is required'
    }),
    year: z.number().int().min(1900).max(2024),
    director: z.string(),
    duration: z.number().int().positive(),
    rate: z.number().min(0).max(10).default(5),
    poster: z.string().url({
        message: 'poster must be a valid url'
    }),
    genre: z.array(
        z.enum(['Action', 'Adventure', 'Crime', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']),
        {
            required_error: 'Movie genre is required.',
            invalid_type_error: 'Movie genre must be an array of enum Genre'
        }
    )
})

export function validateMovie (object) {
    return movieSchema.safeParse(object)
}

export function validatePartialMovie (object) {
    return movieSchema.partial().safeParse(object) //El partial hace que cada una de las propiedad de movieSchema sean opcionales, sirve para actualizar algún dato de las películas
}

