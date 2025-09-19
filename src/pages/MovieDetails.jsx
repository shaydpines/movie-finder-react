import React, {useEffect, useState} from 'react'
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import {FaArrowLeftLong} from "react-icons/fa6";
import Modal from "../components/Modal";
import Skeleton from "../components/Skeleton";

export default function MovieDetails({ isModalOpen, toggleModal }) {
    const navigate = useNavigate();
    let {id} = useParams()
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true);

    async function showMovieDetails() {
        const searchID = `https://www.omdbapi.com/?apikey=3c139917&i=${id}`
        const {data} = await axios.get(searchID);
        setMovie(data);
        setLoading(false);
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
                                <div className="display__title">{loading ? <Skeleton width={"200px"} height={"36px"} /> : movie.Title}</div>
                                </div>
                                <div className="display__essentials">
                                    <div className="display__year">{loading ? <Skeleton width={"36px"} height={"20px"} /> : movie.Year}</div>
                                    <div className="display__rated">Rated:&nbsp;{loading ? <Skeleton width={"24px"} height={"20px"} className={"skeleton__inner"} /> : movie.Rated}</div>
                                    <div className="display__runtime">Runtime:&nbsp;{loading ? <Skeleton width={"48px"} height={"20px"} className={"skeleton__inner"} /> : movie.Runtime}</div>
                                </div>
                                <div className="display__details">
                                    <figure className="display__poster--wrapper">
                                        {loading? <Skeleton width={"300px"} height={"400px"} /> : <img src={movie.Poster} alt="" className="display__poster"/>}
                                    </figure>
                                    <div className="display__description">
                                        <div className="display__section">
                                            <div className="display__genre">{loading ? <Skeleton width={"240px"} height={"20px"} /> : movie.Genre}</div>
                                        </div>
                                        <div className="display__section">
                                            <div className="display__plot">
                                                {loading ? <Skeleton width={"360px"} height={"40px"} /> : movie.Plot}
                                            </div>
                                        </div>
                                        <div className="display__section">
                                            <div className="display__director">Director:&nbsp;{loading ? <Skeleton width={"72px"} height={"20px"} className={"skeleton__inner"} /> : movie.Director}</div>
                                            <div className="display__writer">Writer:&nbsp;{loading ? <Skeleton width={"72px"} height={"20px"} className={"skeleton__inner"} /> : movie.Writer}</div>
                                            <div className="display__actors">
                                                Actors:&nbsp;{loading ? <Skeleton width={"216px"} height={"20px"} className={"skeleton__inner"} /> : movie.Actors}
                                            </div>
                                        </div>
                                        <div className="display__section">
                                            <div className="display__language">Language:&nbsp;{loading ? <Skeleton width={"72px"} height={"20px"} className={"skeleton__inner"} /> : movie.Language}</div>
                                            <div className="display__country">Country:&nbsp;{loading ? <Skeleton width={"72px"} height={"20px"} className={"skeleton__inner"} /> : movie.Country}</div>
                                        </div>
                                        <div className="display__section">
                                            <div className="display__awards">{loading ? <Skeleton width={"216px"} height={"20px"} className={"skeleton__inner"} /> : movie.Awards}</div>
                                        </div>
                                        <div className="display__section">
                                            <div className="display__metascore">Metascore:&nbsp;{loading ? <Skeleton width={"32px"} height={"20px"} className={"skeleton__inner"} /> : movie.Metascore}</div>
                                            <div className="display__imdb-rating">imdb Rating:&nbsp;{loading ? <Skeleton width={"32px"} height={"20px"} className={"skeleton__inner"} /> : movie.imdbRating}</div>
                                            <div className="display__imdb-votes">imdb Votes:&nbsp;{loading ? <Skeleton width={"72px"} height={"20px"} className={"skeleton__inner"} /> : movie.imdbVotes}</div>
                                        </div>
                                        <div className="display__section">
                                            <div className="display__imdb-id">imdb ID:&nbsp;{loading ? <Skeleton width={"92px"} height={"20px"} className={"skeleton__inner"} /> : movie.imdbID}</div>
                                        </div>
                                        <div className="display__section">
                                            <div className="display__box-office">Box Office:&nbsp;{loading ? <Skeleton width={"72px"} height={"20px"} className={"skeleton__inner"} /> : movie.BoxOffice}</div>
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
