import React from 'react'
import {useNavigate} from "react-router-dom";
import Modal from "./Modal";

export default function Start({ initialSearch, setInitialSearch, isModalOpen, toggleModal }) {
    const navigate = useNavigate();

    const handleNavigate = (e) => {
        e.preventDefault();

        navigate("/search", { state: { initialSearch: initialSearch } });
    };

    return (
        <main>
            <Modal isModalOpen={isModalOpen} toggleModal={toggleModal} />
            <section id="start" className="off-white">
                <div className="container">
                    <div className="row start__row">
                        <h1 className="start__title">Welcome to the OMDb API</h1>
                        <div className="start__search--wrapper">
                            <div className="start__search--features">
                                <label className="start__search--label"> Search by title </label>
                            </div>
                            <input
                                type="text"
                                className="start__search--input"
                                placeholder="Find the film you are looking for"
                                onChange={(e) => setInitialSearch(e.target.value)}
                                onKeyUp={(event) => {
                                    event.key === "Enter" && handleNavigate(event);}}
                            />
                        </div>
                        <h2 className="start__sub-title">
                            Search for all your favorite movies or explore and find new
                            ones by title
                        </h2>
                    </div>
                </div>
            </section>
        </main>
    )
}
