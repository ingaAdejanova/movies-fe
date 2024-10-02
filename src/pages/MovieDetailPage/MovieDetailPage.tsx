import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { API_URL } from '../../api/url';
import { useFetch } from '../../hooks/useFetch';
import { Image } from '../../components/core/Image/Image';
import './MovieDetailPage.scss';

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const movie = location.state?.movie;

  const { data: movieDetails, loading } = useFetch<any>({
    url: API_URL.MOVIE_DETAILS(id as string),
    shouldFetch: !movie,
  });

  const movieData = movie || movieDetails;

  if (loading) return <p>Loading...</p>;

  return (
    <div className="movie-detail">
      {movieData && (
        <div className="movie-detail__content">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movieData?.poster_path}`}
            alt={movieData.title}
            className="movie-detail__poster"
          />
          <div className="movie-detail__info">
            <h1 className="movie-detail__title">{movieData.title}</h1>
            <div className="movie-detail__meta">
              <span className="movie-detail__meta-year">{movieData.release_date?.split('-')[0]}</span>
              <span className="movie-detail__meta-age-rating">{movieData.adult ? '16+' : 'All ages'}</span>
            </div>
            <p className="movie-detail__description">{movieData.overview}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailPage;
