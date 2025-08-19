import React, {useState} from 'react'
import Modal from "./Modal";
import axios from "axios";
import MovieList from "./MovieList";

export default function Main({ isModalOpen, toggleModal }) {
    const [search, setSearch] = useState(undefined);
    const [moviesShown, setMoviesShown] = useState([]);

    async function renderMovies(searchInput, filterInput) {
        if (searchInput) {
            const url =(`https://www.omdbapi.com/?apikey=3c139917&s=${searchInput}`);
            setSearch(url);
            const { data } = await axios.get(url);
            if (data.Search) {
            setMoviesShown(data.Search.filter((a) => a.Type === "movie").slice(0, 6));
            } else {
                setMoviesShown([]);
            }
        }

        if (filterInput === "OLD_TO_NEW") {
            setMoviesShown([...moviesShown].sort((a, b) => a.Year - b.Year));
        } else if (filterInput === "NEW_TO_OLD") {
            setMoviesShown([...moviesShown].sort((a, b) => b.Year - a.Year));
        }
    }

    function onSearchChange(event) {
        renderMovies(event.target.value, undefined);
    }

    function filterFilms(event) {
        renderMovies(undefined, event.target.value);
    }

    return (
        <main>
            <section id="search">
                <div className="container">
                    <div className="row">
                        <div className="search__features">
                            <label className="movie__search--label"> Search by title </label>
                            <select id="filter" defaultValue="Sort" onChange={(e) => filterFilms(e)}>
                                <option value="" disabled="">Sort</option>
                                <option value="OLD_TO_NEW">Oldest</option>
                                <option value="NEW_TO_OLD">Most Recent</option>
                            </select>
                        </div>
                        <input
                            type="text"
                            className="movie__search--input"
                            placeholder="find the film you are looking for"
                            onChange={(e) => onSearchChange(e)}
                        />
                    </div>
                </div>
            </section>
            <section id="modal">{isModalOpen && (<Modal toggleModal={toggleModal} />)}</section>
            <section id="movies">
                <div className="container">
                    <div className="row">
                        <div className="movie__details"></div>
                        <div className="movie__list"><MovieList search={search} moviesShown={moviesShown}/></div>
                    </div>
                </div>
            </section>
        </main>
    )
}

