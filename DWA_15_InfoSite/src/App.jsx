/* eslint-disable no-unused-vars */
import React from "react"
import ReactDom from "react-dom"
import Main from "./components/Main"
import Navbar from "./components/Nav"


export default function App(){
    return (
        <div className="container">
         <Navbar />
         <Main />
        </div>
    )
}

ReactDom.render(<App />, document.getElementById("root"))
