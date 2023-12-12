# Podcast App

The Podcast App is a web application designed for users to explore and listen to podcasts. It offers various features such as browsing podcasts, playing episodes, managing favorites, and seamless device responsiveness.

## Features

- Browse and view podcasts with titles, images, season count, genres, and last updated date.
- Sort podcasts alphabetically (A-Z or Z-A) or by the last updated date (newest or oldest).
- Search for specific podcasts using a fuzzy search bar.
- Detailed view for each podcast showcasing its seasons and episodes.
- Audio player with playback controls, progress display, and duration for episodes.
- Mark episodes as favorites and access a list of all favorite episodes.
- Responsive design ensuring a consistent experience across different devices.

## Technology Stack

The Podcast App is built using the following technologies:

- React.js: Front-end library for building user interfaces.
- Fuse.js: Lightweight fuzzy-search library for efficient search functionality.
- CSS: Styling the components and layout of the application.

## Setup

1. Clone the repository to your local machine.

git clone https://github.com/your-username/podcast-app.git

2. Install dependencies using npm or yarn.

cd DWA_18-FinalCapstoneProject
npm install

3. Start the development server.

npm run dev

The application will run at `http://localhost:3000/`.

## Components Overview

- `App`: Main component fetching podcast data, handling sorting, and managing selected show details.
- `AudioPlayer`: Component responsible for playback controls, time display, and duration.
- `Card`: Displaying information about a podcast show.
- `Episodes`: Details of an episode, including playback and favorite options.
- `Navbar`: Navigation bar with links for navigation within the app.
- `SearchBar`: Input field for fuzzy-search functionality.
- `SeasonCard`: Displaying details of a season of a podcast show.
- `ShowDetails`: Detailed view of a show, including seasons and episodes.

## Usage

1. Upon loading, the app fetches podcast data and displays a list of podcasts.

2. Users can sort podcasts alphabetically or by the last updated date using provided buttons.

3. The search bar allows users to find specific podcasts via partial titles using fuzzy search.

4. Clicking a podcast card shows detailed information about the show, including its seasons and episodes.

5. In the detailed view, users can click a season to see its episodes and play them using the audio player.

6. The audio player displays playback time and episode duration and allows seeking through the episode.

7. Users can mark episodes as favorites, view all favorite episodes in the "All Favorites" section.

8. The "Favorites" link in the navbar provides quick access to all favorited episodes.

## Contributions

Contributions to the Podcast App are welcome! If you encounter issues or have improvement suggestions, feel free to open an issue or submit a pull request.

## License

The Podcast App is open-source software licensed under the MIT License. You're free to use, modify, and distribute the code under the terms of the MIT License. Refer to the `LICENSE` file for more details.

## Author

Zamavundla Samkelisiwe Duze

## Wireframe

Check the wireframe of the Podcast App on [Figma]

## Deployed App

Access the deployed Podcast App [here]