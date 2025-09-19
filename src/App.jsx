import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
    const [search, setSearch] = useState("");
    const [initialSearch, setInitialSearch] = useState(null);
    const [moviesShown, setMoviesShown] = useState([]);

    const [pendingSearch, setPendingSearch] = useState("");

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
        }, 1);
    }, [isModalOpen]);

    // Fetch or filter movies
    async function renderMovies(searchInput, filterInput) {
        // Searching
        if (searchInput) {
            setSearch(searchInput);
            setLoading(true);

            const url = `https://www.omdbapi.com/?apikey=3c139917&s=${searchInput}`;

            try {
                const { data } = await axios.get(url);
                if (data.Search) {
                    setMoviesShown(
                        data.Search
                            .filter((a) => a.Type === "movie")
                            .filter(
                                (movie, index, self) =>
                                    index === self.findIndex((m) => m.imdbID === movie.imdbID)
                            )
                            .slice(0, 6)
                    );
                } else {
                    setMoviesShown([]);
                }
            } catch (err) {
                console.error("Error fetching movies:", err);
                setMoviesShown([]);
            } finally {
                setLoading(false); // ✅ only after fetch finishes
            }
        }

        // Filtering
        if (filterInput === "OLD_TO_NEW") {
            setMoviesShown((prev) => [...prev].sort((a, b) => a.Year - b.Year));
        } else if (filterInput === "NEW_TO_OLD") {
            setMoviesShown((prev) => [...prev].sort((a, b) => b.Year - a.Year));
        }
    }

    // Update pending search (debounced)
    function onSearchChange(newValue) {
        setPendingSearch(newValue);
    }

    // Debounce effect for search
    useEffect(() => {
        if (!pendingSearch) return;
        const handler = setTimeout(() => {
            renderMovies(pendingSearch, undefined);
        }, 500);
        return () => clearTimeout(handler);
    }, [pendingSearch]);

    // Immediate search (Enter key)
    function updateSearch(value) {
        setPendingSearch(""); // cancel debounce
        renderMovies(value, undefined);
    }

    function filterFilms(value) {
        renderMovies(undefined, value);
    }

    return (
        <Router>
            <Nav toggleModal={toggleModal} />
            <Routes>
                <Route
                    path="/"
                    element={
                        <Home
                            isModalOpen={isModalOpen}
                            toggleModal={toggleModal}
                            setInitialSearch={setInitialSearch}
                            initialSearch={initialSearch}
                        />
                    }
                />
                <Route
                    path="/search"
                    element={
                        <Search
                            isModalOpen={isModalOpen}
                            toggleModal={toggleModal}
                            setInitialSearch={setInitialSearch}
                            initialSearch={initialSearch}
                            loading={loading}
                            updateSearch={updateSearch}
                            search={search}
                            onSearchChange={onSearchChange}
                            filterFilms={filterFilms}
                            moviesShown={moviesShown}
                        />
                    }
                />
                <Route path="/movie/:id" element={<MovieDetails />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
