import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchData } from '../api/fetcher'
import { API_URL } from '../api/url'

export type Movie = {
  id: string
  title: string
  poster_path: string
  release_date: string
  adult: boolean
  overview: string
}

type MovieResponse = {
  results: Movie[]
  total_pages: number
  page: number
}

type MovieState = {
  popularMovies: Movie[]
  searchResults: Movie[]
  isLoading: boolean
  error: string | null
  currentPopularPage: number
  currentSearchPage: number
  totalPopularPages: number
  totalSearchPages: number
}

const initialState: MovieState = {
  popularMovies: [],
  searchResults: [],
  isLoading: false,
  error: null,
  currentPopularPage: 1,
  currentSearchPage: 1,
  totalPopularPages: 1,
  totalSearchPages: 1,
}

export const fetchPopularMovies = createAsyncThunk<MovieResponse, number>(
  'movies/fetchPopularMovies',
  async (page: number) => {
    const response = await fetchData<MovieResponse>({
      url: API_URL.POPULAR_MOVIES,
      params: { page },
    })
    return response
  },
)

export const searchMovies = createAsyncThunk<MovieResponse, { query: string; page: number }>(
  'movies/searchMovies',
  async ({ query, page }) => {
    const response = await fetchData<MovieResponse>({
      url: API_URL.SEARCH_MOVIES,
      params: { query, page },
    })
    return response
  },
)

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    resetSearch(state) {
      state.searchResults = []
      state.currentSearchPage = 1
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.isLoading = false
        state.popularMovies = [...state.popularMovies, ...action.payload.results]
        state.totalPopularPages = action.payload.total_pages
        state.currentPopularPage += 1
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || null
      })
      .addCase(searchMovies.pending, (state) => {
        state.isLoading = true
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.isLoading = false
        state.searchResults = [...state.searchResults, ...action.payload.results]
        state.totalSearchPages = action.payload.total_pages
        state.currentSearchPage += 1
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || null
      })
  },
})

export const { resetSearch } = moviesSlice.actions

export default moviesSlice.reducer
