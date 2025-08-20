import React, {useEffect, useState, useRef} from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Search from "./pages/Search";
import MovieDetails from "./pages/MovieDetails";
import axios from "axios";

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isMounted = useRef(false);

    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState(undefined);
    const [initialSearch, setInitialSearch] = useState(null);
    const [moviesShown, setMoviesShown] = useState([]);


    function toggleModal() {
        setIsModalOpen(!isModalOpen);
    }

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }

        if (!isModalOpen) {
            return document.body.classList.remove("modal--open");
        }
        setTimeout(() => {
            document.body.classList += "modal--open";
        }, 1)
    }, [isModalOpen])

    async function renderMovies(searchInput, filterInput) {
        if (searchInput) {
            const url = (`https://www.omdbapi.com/?apikey=3c139917&s=${searchInput}`);
            setSearch(url);
            const {data} = await axios.get(url);
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
        console.log(event.target.value);
        updateSearch(event.target.value);
    }

    function updateSearch(value) {
        console.log(value);
        renderMovies(value, undefined);
    }

    function filterFilms(event) {
        console.log(event.target.value);
        renderMovies(undefined, event.target.value);
    }

    return (
        <>
            <Router>
                <Nav toggleModal={toggleModal}/>
                <Routes>
                    <Route path="/" element={<Home isModalOpen={isModalOpen} toggleModal={toggleModal}
                                                   setInitialSearch={setInitialSearch}
                                                   initialSearch={initialSearch}/>}
                    />
                    <Route path="/search" element={<Search isModalOpen={isModalOpen} toggleModal={toggleModal}
                                                           setInitialSearch={setInitialSearch}
                                                           initialSearch={initialSearch} loading={loading}
                                                           setLoading={setLoading} updateSearch={updateSearch}
                                                           search={search} onSearchChange={onSearchChange}
                                                           filterFilms={filterFilms} moviesShown={moviesShown}/>}
                    />
                    <Route path="/movie/:id" element={<MovieDetails/>}/>
                </Routes>
                <Footer/>
            </Router>
        </>
    );
}

export default App;
