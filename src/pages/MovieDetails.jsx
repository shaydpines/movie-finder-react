import React, {useEffect, useState} from 'react'
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import {FaArrowLeftLong} from "react-icons/fa6";
import Modal from "../components/Modal";

export default function MovieDetails({ isModalOpen, toggleModal }) {
    const navigate = useNavigate();
    let {id} = useParams()
    const [movie, setMovie] = useState({});

    async function showMovieDetails() {
        const searchID = `https://www.omdbapi.com/?apikey=3c139917&i=${id}`
        const {data} = await axios.get(searchID);
        setMovie(data);
    }

    useEffect(() => {
        showMovieDetails();
    }, [showMovieDetails])

    return (
        <main>
            <section id="movies">
                <div className="container">
                    <div className="row">
                        <div className="movie__details">
                            <div className="movie__display">
                                <div className="display__header">
                                <FaArrowLeftLong className="display__exit click" onClick={() => navigate("/")}/>
                                <div className="display__title">{movie.Title}</div>
                                </div>
                                <div className="display__essentials">
                                    <div className="display__year">{movie.Year}</div>
                                    <div className="display__rated">Rated: {movie.Rated}</div>
                                    <div className="display__runtime">Runtime: {movie.Runtime}</div>
                                </div>
                                <div className="display__details">
                                    <figure className="display__poster--wrapper">
                                        <img src={movie.Poster} alt="" className="display__poster"/>
                                    </figure>
                                    <div className="display__description">
                                        <div className="display__section">
                                            <div className="display__genre">{movie.Genre}</div>
                                        </div>
                                        <div className="display__section">
                                            <div className="display__plot">
                                                {movie.Plot}
                                            </div>
                                        </div>
                                        <div className="display__section">
                                            <div className="display__director">Director: {movie.Director}</div>
                                            <div className="display__writer">Writer: {movie.Writer}</div>
                                            <div className="display__actors">
                                                Actors: {movie.Actors}
                                            </div>
                                        </div>
                                        <div className="display__section">
                                            <div className="display__language">Language: {movie.Language}</div>
                                            <div className="display__country">Country: {movie.Country}</div>
                                        </div>
                                        <div className="display__section">
                                            <div className="display__awards">{movie.Awards}</div>
                                        </div>
                                        <div className="display__section">
                                            <div className="display__metascore">Metascore: {movie.Metascore}</div>
                                            <div className="display__imdb-rating">imdb Rating: {movie.imdbRating}</div>
                                            <div className="display__imdb-votes">imdb Votes: {movie.imdbVotes}</div>
                                        </div>
                                        <div className="display__section">
                                            <div className="display__imdb-id">imdb ID: {movie.imdbID}</div>
                                            <div className="display__type">Type: {movie.Type}</div>
                                        </div>
                                        <div className="display__section">
                                            <div className="display__box-office">Box Office: {movie.BoxOffice}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
