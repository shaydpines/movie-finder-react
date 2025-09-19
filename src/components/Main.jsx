import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import MovieList from "./MovieList";

export default function Main({
                                 isModalOpen,
                                 toggleModal,
                                 loading,
                                 initialSearch,
                                 search,
                                 updateSearch,   // immediate search (on Enter)
                                 onSearchChange, // debounced (called on every keystroke)
                                 filterFilms,
                                 moviesShown,
                             }) {
    const [tempSearch, setTempSearch] = useState(initialSearch || "");

    useEffect(() => {
        if (initialSearch) {
            setTempSearch(initialSearch);
            updateSearch(initialSearch);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialSearch]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            // fire immediate search and clear any pending debounce (handled in App.updateSearch)
            updateSearch(tempSearch);
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setTempSearch(value);
        onSearchChange(value); // update pendingSearch in App so debounce can run
    };

    return (
        <main>
            <section id="search">
                <div className="container">
                    <div className="row">
                        <div className="search__features">
                            <label className="movie__search--label"> Search by title </label>
                            <select
                                id="filter"
                                defaultValue="Sort"
                                onChange={(e) => filterFilms(e.target.value)}
                            >
                                <option value="" disabled>
                                    Sort
                                </option>
                                <option value="OLD_TO_NEW">Oldest</option>
                                <option value="NEW_TO_OLD">Most Recent</option>
                            </select>
                        </div>

                        <input
                            type="text"
                            className="movie__search--input"
                            placeholder="find the film you are looking for"
                            value={tempSearch}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>
            </section>

            <section id="modal">{isModalOpen && <Modal toggleModal={toggleModal} />}</section>

            <section id="movies">
                <div className="container">
                    <div className="row">
                        <MovieList search={search} moviesShown={moviesShown} loading={loading} />
                    </div>
                </div>
            </section>
        </main>
    );
}
