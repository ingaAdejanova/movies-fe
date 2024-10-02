import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchData } from '../api/fetcher'
import { API_URL } from '../api/url'
import { Movie, MovieResponse } from './types'

type PopularMoviesState = {
  movies: Movie[]
  isLoading: boolean
  error: string | null
  pagination: {
    currentPage: number
    totalPages: number
  }
}

const initialState: PopularMoviesState = {
  movies: [],
  isLoading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
  },
}

export const fetchPopularMovies = createAsyncThunk<MovieResponse, number>(
  'popularMovies/fetchPopularMovies',
  async (page: number) => {
    const response = await fetchData<MovieResponse>({
      url: API_URL.POPULAR_MOVIES,
      params: { page },
    })
    return response
  },
)

export const popularMovieSlice = createSlice({
  name: 'popularMovies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.isLoading = false
        state.movies = [...state.movies, ...action.payload.results]
        state.pagination.totalPages = action.payload.total_pages
        state.pagination.currentPage += 1
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || null
      })
  },
})

export default popularMovieSlice.reducer
