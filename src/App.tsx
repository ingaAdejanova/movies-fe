import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ROUTES } from './routes'
import './App.css'

const MovieDetailPage = React.lazy(() => import('./pages/MovieDetailPage/MovieDetailPage'))
const MoviePage = React.lazy(() => import('./pages/MoviePage/MoviePage'))

const App = () => {
  return (
    <Router>
      <Suspense fallback={<></>}>
        <Routes>
          <Route path={ROUTES.MOVIES} element={<MoviePage />} />
          <Route path={ROUTES.MOVIE} element={<MovieDetailPage />} />
          <Route path="*" element={<Navigate to={ROUTES.MOVIES} />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
