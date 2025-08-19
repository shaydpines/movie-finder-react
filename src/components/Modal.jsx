import React from 'react'
import emailjs from '@emailjs/browser';
import { FaTimes, FaSpinner } from "react-icons/fa";

export default function Modal({ toggleModal }) {
    function contact(event) {
        event.preventDefault();
        const loading = document.querySelector(".modal__overlay--loading");
        const success = document.querySelector(".modal__overlay--success");
        loading.classList += " modal__overlay--visible";
        emailjs
            .sendForm(
                "service_ujr8hmo",
                "template_btj37gh",
                event.target,
                "rXrihK7XNBF_-S2SO"
            )
            .then(() => {
                loading.classList.remove("modal__overlay--visible");
                success.classList += " modal__overlay--visible";
                console.log("this worked1");
            })
            .catch(() => {
                loading.classList.remove("modal__overlay--visible");
                alert(
                    "The email service is temporarily unavailable. Please contact me directly at rafaelladmerprice@gmail.com"
                );
                console.log("this didn't work");
            });
    }

    return (
        <div className="modal">
            <div className="modal__half modal__about">
                <div className="container modal__container">
                    <div className="row modal__row">
                        <h3 className="modal__title">Here's a bit about me.</h3>
                        <h4 className="modal__sub-title">Frontend Software Engineer</h4>
                        <p className="modal__para">
                            Hey there! My name is <b className="color--text">Rafael Shay</b> and I'm a <b
                            className="color--text">Frontend Software Engineer</b> currently learning the ropes
                            and expanding my portfolio. If you like what you see here and you need dedicated talent
                            to help you build websites send me a message and I'll be sure to respond as soon as I can!
                        </p>
                        <div className="modal__languages">
                            <figure className="modal__language">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/HTML5_Badge.svg/240px-HTML5_Badge.svg.png"
                                    className="modal__language--img"
                                    alt=""
                                />
                                <span className="language__name">HTML</span>
                            </figure>
                            <figure className="modal__language">
                                <img
                                    src="https://cdn.iconscout.com/icon/free/png-256/css-131-722685.png"
                                    className="modal__language--img"
                                    alt=""
                                />
                                <span className="language__name">CSS</span>
                            </figure>
                            <figure className="modal__language">
                                <img
                                    src="https://cdn.iconscout.com/icon/free/png-256/javascript-1-225993.png"
                                    className="modal__language--img"
                                    alt=""
                                />
                                <span className="language__name">Javascript</span>
                            </figure>
                            <figure className="modal__language">
                                <img
                                    src="https://cdn.iconscout.com/icon/free/png-256/react-3-1175109.png"
                                    className="modal__language--img"
                                    alt=""
                                />
                                <span className="language__name">React</span>
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal__half modal__contact">
                <div className="container modal__container">
                    <div className="row modal__row">
                        <h3 className="modal__title">Let's have a chat!</h3>
                        <h4 className="modal__sub-title">I'd love to hear from you!</h4>
                        <form id="contact__form" onSubmit={(event) => contact(event)}>
                            <div className="form__item">
                                <label className="form__item--label">Name</label>
                                <input type="text" name="user_name" className="input" required/>
                            </div>
                            <div className="form__item">
                                <label className="form__item--label">Email</label>
                                <input
                                    type="email"
                                    name="user_email"
                                    className="input"
                                    required
                                />
                            </div>
                            <div className="form__item">
                                <label className="form__item--label">Message</label>
                                <textarea
                                    name="message"
                                    className="input"
                                    required
                                ></textarea>
                            </div>
                            <button id="contact__submit" className="form__submit">
                                Send it my way
                            </button>
                        </form>
                        <div className="modal__overlay modal__overlay--loading">
                            <FaSpinner className="fa-spinner" />
                        </div>
                        <div className="modal__overlay modal__overlay--success">
                            Thanks for the message! Looking forward to speaking to you soon.
                        </div>
                    </div>
                </div>
                <FaTimes className="modal__exit click" onClick={toggleModal}/>
            </div>
        </div>
    )
}
