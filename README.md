# Movies FE

This is a React.js application that provides a paginated list of movies using the Movies DB API. It includes features such as search, infinite scrolling, movie details, and state management using Redux.


## Installation

To get started, clone the repository and install the necessary dependencies.

```bash
git clone <repository_url>
cd movies-fe
npm install --global yarn
yarn install
```


## Development

To start the project in development mode with hot-reloading, run:

```bash
yarn dev
```

## Testing

To run the tests using Jest:

```bash
yarn test
```

## Alternative Data Fetching Consideration
In this project, Redux has been utilized for state management and data fetching. However, another powerful alternative for handling data fetching in React applications could be SWR (Stale-While-Revalidate). SWR simplifies the process of fetching, caching, and revalidating data
