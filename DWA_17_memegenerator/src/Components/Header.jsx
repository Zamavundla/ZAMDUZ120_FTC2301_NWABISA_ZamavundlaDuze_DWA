/* eslint-disable no-unused-vars */
import React from "react";
import trollface from "../assets/trollface.png"

export default function Header() {
    return (
        <header className="header">
            <img src={trollface} className="header--image"/>
            <h1 className="header--title">Meme Generator</h1>
            <h3 className="header-project">React Course - Project 3</h3>
        </header>
    )
}
