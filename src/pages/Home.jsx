import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Main from "../components/Main";

export default function Home({ isModalOpen, toggleModal }) {
    const location = useLocation();

    useEffect(() => {
        if (location.state?.openModal) {
            toggleModal();
            // clear just the state part so it won't loop
            window.history.replaceState({}, document.title, location.pathname);
        }
        // 👇 only run when the path itself changes, not on every render
    }, [location.pathname]);

    return (
        <>
            <Main isModalOpen={isModalOpen} toggleModal={toggleModal} />
        </>
    );
}
