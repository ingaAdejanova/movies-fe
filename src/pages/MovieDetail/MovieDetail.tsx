import React from 'react'
import { useParams } from 'react-router-dom'
import { API_URL } from '../../api/url'
import { useFetch } from '../../hooks/useFetch'
import './MovieDetail.scss'

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  const { data: movieDetails, loading, error } = useFetch<any>(API_URL.MOVIE_DETAILS(id as string))

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="movie-detail">
      {movieDetails && (
        <div className="movie-detail-content">
          <img
            className="movie-poster"
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={movieDetails.title}
          />
          <div className="movie-info">
            <h1 className="movie-title">{movieDetails.title}</h1>
            <div className="movie-meta">
              <span className="movie-year">{movieDetails.release_date.split('-')[0]}</span>
              <span className="movie-age-rating">{movieDetails.adult ? '16+' : 'All ages'}</span>
            </div>
            <p className="movie-description">{movieDetails.overview}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default MovieDetail
