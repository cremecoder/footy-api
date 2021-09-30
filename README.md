# World Cup 2018 - REST API

This repo contains the source files for my World Cup 2018 REST API, using **Node.js** with **Express.js** framework.

> Visit the URL for the [api here](https://worldcup2018-api.herokuapp.com).
>
> See the [frontend project](https://vigorous-spence-f64f9f.netlify.app/) I have created which consumes this API.

<br>

## Background

This is one of two parts of my fullstack project World Cup 2018 Fixtures. The project as a whole was a light brief given to me by an agency based in my hometown for the purposes of feedback and critique of my skills. This application makes use of the following:

- MVC pattern and custom middleware to control data requests and responses.
- Pulling in two API calls from third parties:
  - Promise based handling of the third party API data.
  - Sorting through the two sets of JSON data and returning the desired format for the match fixtures.
- Constructors with prototype functions for the data models.
- Creating a JSON database.

<br>

## Instructions

To make use these files locally, you can read below:

```
npm install

npm start
```

- `npm install` will install dependencies and create `node_modules` folder.
- `npm start` will spin up the server and listen for incoming requests.

<br>

## Files

- `controllers/apiController.js` Middleware functions controlling requests and responses.
- `data/`
  - `model.json` This is a reference file for the expected JSON format of each match fixture.
  - `matches2.json` The main database file, which is created here upon the first instance of a **GET** request to the _/api/worldcup_ endpoint.
- `models/`
  - `GetData.js` Constructor function with methods that handle promise based operations and passes responses to `apiController.js`
  - `SortData.js` Contructor function with methods that handle sorting API data from `GetData.js` and returns the desired format for the database.
- `api.js` Main entry point for the application.
- `apiRouter.js` Handles **GET** and **POST** requests.

<br>

## Endpoints

> `GET`
>
> `/` Returns a JSON object example of a match fixture expected from this API.
>
> `/api/worldcup` Returns boolean value dependant on:
>
> - **A.** Initially creating the database file `matches2.json`.
> - **B.** Any further requests to read the file.
>
> `/api/showData` Returns a JSON object containing an array of all of the match fixtures for the competition.
>
> `POST`
>
> `/api/worldcup/findMatches` Returns JSON object containing an array of all of the match fixtures for a requested team.

<br>

### Example **POST** request using Javascript's Fetch API:

```
const team = "england"

fetch("https://worldcup2018-api.herokuapp.com/api/worldcup/findMatches", {
  method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ team })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data.matches)
    })
    .catch(err => {
    console.error(err)
})
```
