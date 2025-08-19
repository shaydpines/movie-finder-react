import React, {useEffect, useState, useRef} from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Footer from "./components/Footer";

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isMounted = useRef(false);

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

    return (
        <>
            <Router>
                <Nav toggleModal={toggleModal} />
                <Routes>
                    <Route path="/" element={<Home isModalOpen={isModalOpen} toggleModal={toggleModal} />}/>
                    <Route path="/movie/:id" element={<MovieDetails />}/>
                </Routes>
                <Footer />
            </Router>
        </>
    );
}

export default App;
