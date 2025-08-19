import MovieCard from "./MovieCard";

export default function MovieList({ search, moviesShown }) {
    return (
        <>
            {search &&
                moviesShown.map((movie) => (
                    <MovieCard key={movie.imdbID} movie={movie} />
                ))}
        </>
    );
}