import React, {useEffect} from "react";
import Main from "../components/Main";
import {useLocation} from "react-router-dom";


export default function Search({
                                   isModalOpen,
                                   toggleModal,
                                   loading,
                                   initialSearch,
                                   setInitialSearch,
                                   search,
                                   updateSearch,
                                   onSearchChange,
                                   filterFilms,
                                   moviesShown
                               }) {
    const location = useLocation();

    useEffect(() => {
        if (location.state?.initialSearch) {
            setInitialSearch(location.state.initialSearch);
        }
    }, [location.state]);


    return (
        <>
            <Main isModalOpen={isModalOpen} toggleModal={toggleModal} loading={loading}
                  initialSearch={initialSearch} search={search} updateSearch={updateSearch}
                  onSearchChange={onSearchChange} filterFilms={filterFilms} moviesShown={moviesShown}/>
        </>
    );
}