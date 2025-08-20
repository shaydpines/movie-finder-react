import React, {useEffect} from 'react'
import Modal from "./Modal";
import MovieList from "./MovieList";

export default function Main({
                                 isModalOpen,
                                 toggleModal,
                                 loading,
                                 initialSearch,
                                 search,
                                 updateSearch,
                                 onSearchChange,
                                 filterFilms,
                                 moviesShown
                             }) {
useEffect(() => {
    updateSearch(initialSearch);
}, [])

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
                            defaultValue={initialSearch}
                            onChange={(e) => onSearchChange(e)}
                        />
                    </div>
                </div>
            </section>
            <section id="modal">{isModalOpen && (<Modal toggleModal={toggleModal}/>)}</section>
            <section id="movies">
                <div className="container">
                    <div className="row">
                        <MovieList search={search} moviesShown={moviesShown}
                                                                loading={loading}/>
                    </div>
                </div>
            </section>
        </main>
    )
}

