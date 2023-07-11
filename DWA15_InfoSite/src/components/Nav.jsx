/* eslint-disable no-unused-vars */
import React from "react"
import logo1 from "../assets/th.jpg"

export default function Navbar() {
    return (
        <nav>
            <img src={logo1} />
            <h3 className="nav--logo_text">React Facts</h3>
            <h4 className="nav--title">React Course - Project 1</h4>
        </nav>
    )
}
