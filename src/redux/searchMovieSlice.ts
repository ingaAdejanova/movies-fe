import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchData } from '../api/fetcher'
import { API_URL } from '../api/url'
import { Movie, MovieResponse } from './types'

type SearchMoviesState = {
  searchResults: Movie[]
  isLoading: boolean
  error: string | null
  pagination: {
    currentPage: number
    totalPages: number
  }
}

const initialState: SearchMoviesState = {
  searchResults: [],
  isLoading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
  },
}

export const searchMovies = createAsyncThunk<MovieResponse, { query: string; page: number }>(
  'searchMovies/searchMovies',
  async ({ query, page }) => {
    const response = await fetchData<MovieResponse>({
      url: API_URL.SEARCH_MOVIES,
      params: { query, page },
    })
    return response
  },
)

export const searchMovieSlice = createSlice({
  name: 'searchMovies',
  initialState,
  reducers: {
    resetSearch(state) {
      state.searchResults = []
      state.pagination = { currentPage: 1, totalPages: 1 }
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.isLoading = false
        state.searchResults = [...state.searchResults, ...action.payload.results]
        state.pagination.totalPages = action.payload.total_pages
        state.pagination.currentPage += 1
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || null
      })
  },
})

export const { resetSearch } = searchMovieSlice.actions
export default searchMovieSlice.reducer
