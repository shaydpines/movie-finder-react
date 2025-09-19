import MovieCard from "./MovieCard";

export default function MovieList({ search, moviesShown, loading }) {
    const resetKey = search + moviesShown.map((m) => m.imdbID).join("");

    return (
        <div key={resetKey} className="movie__list">
            {loading ? (
                // Show skeletons ONLY while loading
                Array.from({ length: 6 }, (_, index) => (
                    <div key={index} className="movie__skeleton" />
                ))
            ) : moviesShown.length > 0 ? (
                // Show movies when not loading
                moviesShown.map((movie, index) => (
                    <MovieCard key={movie.imdbID} movie={movie} index={index} />
                ))
            ) : (
                // Show "no results" only when not loading
                search && <p className="movie__empty">No movies found for "{search}".</p>
            )}
        </div>
    );
}
