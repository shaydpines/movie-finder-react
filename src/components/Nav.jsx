import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Nav({ toggleModal }) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleContactClick = (e) => {
        e.preventDefault();

        if (location.pathname === "/") {
            toggleModal();
        } else {
            navigate("/", { state: { openModal: true } });
        }
    };

    return (
        <nav>
            <div className="nav__row">
                <h3 className="OMDb">OMDb API</h3>
                <h3 className="nav__title">Search Movies By Title</h3>
                <ul className="nav__links">
                    <li className="nav__link">
                        <Link to="/" className="nav__link--anchor">
                            Search
                        </Link>
                    </li>
                    <li className="nav__link">
                        <a
                            href="/"
                            onClick={handleContactClick}
                            className="nav__link--anchor"
                        >
                            Contact
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
