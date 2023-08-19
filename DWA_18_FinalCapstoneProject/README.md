# Podcast App

Welcome to the Podcast App project! This readme file provides an overview of the technology, data structure, endpoints, relationships, user stories, and deployment instructions for the app.

## Technology

This project allows you to leverage various technologies and frameworks to build a functional podcast app. While you can use plain JavaScript, it's recommended to use a framework and/or build process to manage complexity. You have the freedom to choose technologies like Next.js, Create React App (CRA), or Vue.js. TypeScript is recommended but not mandatory.

During the final assessment, your understanding of the chosen technologies and your ability to discuss your code will contribute to your project's success.

## Data

The app's data revolves around three main semantic units:

- EPISODE: Represents a specific MP3 file that users can listen to.
- SEASON: A collection of EPISODEs released over a specific timespan.
- SHOW: Refers to a podcast containing one or more SEASONs.

Additionally, the API exposes a PREVIEW of SHOWs with basic data but no SEASON or EPISODE information.

## Endpoints

The data can be fetched from two endpoints:

1. `https://podcast-api.netlify.app/shows`: Returns an array of PREVIEW objects.
2. `https://podcast-api.netlify.app/id/<ID>`: Returns a single SHOW object with embedded SEASON and EPISODE objects.

## Relationships

The project involves several related data types: EPISODE, SEASON, SHOW, PREVIEW, and GENRE. Key relationships include:

- Multiple EPISODEs make up a SEASON.
- Multiple SEASONs make up a SHOW.
- SHOW and PREVIEW share the id property, representing different forms of the same data.
- Both SHOW and PREVIEW have a property named GENRE. GENRE inside PREVIEW is an array of numbers (id), while GENRE inside SHOW is an array of strings (title).

For further details on relationships, refer to the provided chart in the project.

## Genre Titles

Genre information is exposed on PREVIEW using GENRE ids. A mapping between GENRE ids and titles is recommended for better code organization.

| ID | Title                              |
|----|------------------------------------|
| 1  | Personal Growth                    |
| 2  | True Crime and Investigative Journalism |
| 3  | History                            |
| 4  | Comedy                             |
| 5  | Entertainment                      |
| 6  | Business                           |
| 7  | Fiction                            |
| 8  | News                               |
| 9  | Kids and Family                    |

## User Stories

Your goal is to meet the requirements of the following user stories, creating a fully functional podcast app:

1. The app is deployed to a custom Netlify URL.
2. All views display correctly on "iPhone SE" or other devices.
3. Favicon information is set using a favicon generator tool.
4. Metatag information is added, including absolute Netlify URLs.
5. Show data is fetched via a call to `https://podcast-api.netlify.app/shows`.
6. Specific show data is fetched from individual show endpoints.
7. Loading states are implemented during data fetching.
8. Users can view show details by seasons, sorted by number.
9. Users can listen to episodes in a season of a show.
10. A view shows only episodes for a selected season.
11. Users can toggle between different seasons for the same show.
12. All available show names are displayed.
13. Preview images of shows are shown while browsing.
14. The number of seasons per show is displayed.
15. A human-readable last update date is shown for shows.
16. Genres associated with a show are displayed as genre titles.
17. Preview images of seasons for a show are displayed.
18. The number of episodes in a season is shown.
19. Users can return to a show view from a season-specific view.
20. Users can mark episodes as favorites.
21. Users can view all their favorite episodes.
22. Show and season of episodes in favorites are displayed.
23. Episodes are grouped in favorites by season/show.
24. Users can remove episodes from favorites.
25. Users can sort shows by title in A-Z order.
26. Users can sort shows by title in Z-A order.
27. Shows can be sorted by date updated (ascending).
28. Shows can be sorted by date updated (descending).
29. Users can filter shows by title using a text input.
30. Fuzzy matching allows finding shows based on strings.
31. Shows are automatically filtered by genre when clicked.
32. Users see the date/time when an episode is added to favorites.
33. Favorites can be arranged by show titles (A-Z).
34. Favorites can be arranged by show titles (Z-A).
35. Favorites can be arranged by date updated (ascending).
36. Favorites can be arranged by date updated (descending).
37. The audio player displays progress and episode length.
38. The audio player is always visible for continuous listening.
39. Users are prompted to confirm closing when audio plays.
40. The app remembers the last played show and episode.
41. The app remembers fully listened-to shows and episodes.
42. The app remembers the stopping timestamp within 10 seconds.
43. The app shows progress timestamps for started episodes.
44. Users can reset all listening progress.
45. A sliding carousel of potential shows is on the landing page.
46. Users can log in via Supabase authentication.
47. User favorites are stored in the Supabase database.
48. User favorites sync automatically when logged in.
49. Users can share favorites via a publicly accessible URL.

## Deployment

To deploy the project, follow these steps:

1. Ensure the project is ready for deployment, meeting the user story requirements.
2. Deploy the project to a custom Netlify URL.
3. Make sure that all views display correctly on the smallest mobile device, such as "iPhone SE" (you can use Chrome Dev tools for emulation).
4. Set up favicon information using https://realfavicongenerator.net/ and metatag information via https://metatags.io/. Replace URL values with absolute Netlify URLs.
5. Load show data via a fetch call from `https://podcast-api.netlify.app/shows`.
6. Fetch data for individual shows from their respective endpoint.
7. Implement loading states for initial and new data fetching.
8. Ensure all user stories are met and the app provides a seamless user experience.

## Conclusion

This readme provides an overview of the Podcast App project, including its technology stack, data structure, endpoints, relationships, user stories, deployment process, and submission instructions. Have fun building your fully functional podcast app!