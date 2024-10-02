import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

const MovieDetailPage = React.lazy(() => import('./pages/MovieDetailPage/MovieDetailPage'))
const MoviePage = React.lazy(() => import('./pages/MoviePage/MoviePage'))

const ROUTES = {
  MOVIES: '/',
  MOVIE: '/movie/:id'
}

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div></div>}>
        <Routes>
          <Route path={ROUTES.MOVIES} element={<MoviePage />} />
          <Route path={ROUTES.MOVIE} element={<MovieDetailPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
