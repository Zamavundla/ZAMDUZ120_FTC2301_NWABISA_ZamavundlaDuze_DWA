/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";

// Meme component
export default function Meme() {
    // State to hold the current meme's top text, bottom text, and random image URL
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" // Default meme image URL
    });

    // State to store all available memes
    const [allMemes, setAllMemes] = React.useState([]);

    // Fetch memes from the API on component mount using useEffect
    React.useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes");
            const data = await res.json();
            setAllMemes(data.data.memes);
        }
        getMemes();
    }, []);

    // Function to get a new random meme image URL and update the state
    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length);
        const url = allMemes[randomNumber].url;
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }));
    }

    // Function to handle changes in the input fields and update the state accordingly
    function handleChange(event) {
        const { name, value } = event.target;
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }));
    }

    // JSX for rendering the Meme component
    return (
        <main>
            {/* Input form for top and bottom text */}
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                {/* Button to get a new meme image */}
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            {/* Meme container to display the random meme */}
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" alt="Random Meme" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    );
}
