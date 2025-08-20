import MovieCard from "./MovieCard";

export default function MovieList({ search, moviesShown, loading }) {
    return (
        <>
            {loading ? (<div></div>) : (search &&
                moviesShown.map((movie, index) => (
                    <MovieCard key={movie.imdbID} movie={movie} index={index}/>
                )))
            }
        </>
    );
}