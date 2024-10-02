import { useParams, useLocation } from 'react-router-dom'
import { API_URL } from '../../api/url'
import { useFetch } from '../../hooks/useFetch'
import { Image } from '../../components/core/Image/Image'
import { Loader } from '../../components/core/Loader'
import { TMDB_IMAGE_BASE_URL } from '../../constants'
import './MovieDetailPage.scss'

type Movie = {
  title: string
  poster_path: string
  release_date: string
  adult: boolean
  overview: string
}

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()

  const movie = location.state?.movie

  const { data: movieDetails, loading } = useFetch<Movie>({
    url: API_URL.MOVIE_DETAILS(id as string),
    shouldFetch: !movie,
  })

  const movieData = movie || movieDetails
  const posterUrl = movieData?.poster_path ? `${TMDB_IMAGE_BASE_URL}${movieData.poster_path}` : null

  if (loading)
    return (
      <div className="loader-container">
        <Loader />
      </div>
    )

  return (
    <div className="movie-detail">
      {movieData && (
        <div className="movie-detail__content">
          <div className="movie-detail__poster">
            <Image src={posterUrl} alt={movieData.title} />
          </div>
          <div className="movie-detail__info">
            <h1 className="movie-detail__title">{movieData.title}</h1>
            <div className="movie-detail__meta">
              <span className="movie-detail__meta-year">{movieData.release_date?.split('-')?.[0]}</span>
              <span className="movie-detail__meta-age-rating">{movieData.adult ? '16+' : 'All ages'}</span>
            </div>
            <p className="movie-detail__description">{movieData.overview}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default MovieDetailPage
