import React, {useState} from "react";
import {Link} from "react-router-dom";

function MovieCard({movie}) {
    const [noImage, setNoImage] = useState(false);

    return (
        <Link className="off-white" to={`/movie/${movie.imdbID}`}>
            <div className="movie click">
                <figure className="movie-poster__wrapper">
                    {!noImage ? (
                        <img
                            src={movie.Poster}
                            className="movie-poster"
                            alt={movie.Title}
                            onError={(e) => {
                                e.target.onerror = null;
                                setNoImage(true);
                            }}
                        />
                    ) : (
                        <div
                            className="movie-poster__skeleton"
                            onClick={() => setNoImage(false)} // reset if needed
                        >
                            {movie.Title}
                        </div>
                    )}
                </figure>
                <div className="movie__description">
                    <div className="movie-title">{movie.Title}</div>
                    <div className="movie-year">{movie.Year}</div>
                </div>
            </div>
        </Link>
    );
}

export default MovieCard;