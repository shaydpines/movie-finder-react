import MovieCard from "./MovieCard";

export default function MovieList({ search, moviesShown, loading }) {
    const resetKey = search + moviesShown.map(m => m.imdbID).join("");

    return (
        <div key={resetKey} className="movie__list">
            {loading ? Array.from({ length: 6 }, (_, index) => (
                    <div key={index} className="movie__skeleton" />
                )) : (search &&
                moviesShown.map((movie, index) => (
                    <MovieCard key={movie.imdbID} movie={movie} index={index}/>
                )))
            }
        </div>
    );
}