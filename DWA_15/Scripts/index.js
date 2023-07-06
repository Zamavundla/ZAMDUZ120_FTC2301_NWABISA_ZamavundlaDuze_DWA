/* Surprise! You probably thought you could just forget
the line of code you just learned! Nope, not on my watch!

Try to write that 1-liner of React code again! This time,
see if you can figure out how to render an <ul> with 2+ <li>s inside*/
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"


ReactDOM.render(
    <ul><li>Thing 1</li><li>Thing 2</li></ul>,
    document.getElementById("root")
)