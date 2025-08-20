import React, {useEffect} from "react";
import {useLocation} from "react-router-dom";
import Main from "../components/Main";
import Start from "../components/Start";

export default function Home({isModalOpen, toggleModal, setInitialSearch, initialSearch}) {
    const location = useLocation();

    useEffect(() => {
        if (location.state?.openModal) {
            toggleModal();
            window.history.replaceState({}, document.title, location.pathname);
        }
    }, [location.pathname]);

    return (
        <>
            <Start setInitialSearch={setInitialSearch} initialSearch={initialSearch}  isModalOpen={isModalOpen}
                   toggleModal={toggleModal}/>
        </>
    );
}
