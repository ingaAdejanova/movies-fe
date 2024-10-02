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
  movieLists: {
    popularMovies: Movie[]
    searchResults: Movie[]
  }
  isLoading: boolean
  errors: {
    popularError: string | null
    searchError: string | null
  }
  pagination: {
    popularMovies: { currentPage: number; totalPages: number }
    searchResults: { currentPage: number; totalPages: number }
  }
}

const initialState: MovieState = {
  movieLists: {
    popularMovies: [],
    searchResults: [],
  },
  isLoading: false,
  errors: {
    popularError: null,
    searchError: null,
  },
  pagination: {
    popularMovies: { currentPage: 1, totalPages: 1 },
    searchResults: { currentPage: 1, totalPages: 1 },
  },
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
      state.movieLists.searchResults = []
      state.pagination.searchResults = { currentPage: 1, totalPages: 1 }
      state.errors.searchError = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.isLoading = true
        state.errors.popularError = null
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.isLoading = false
        state.movieLists.popularMovies = [...state.movieLists.popularMovies, ...action.payload.results]
        state.pagination.popularMovies.totalPages = action.payload.total_pages
        state.pagination.popularMovies.currentPage += 1
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.isLoading = false
        state.errors.popularError = action.error.message || null
      })

      .addCase(searchMovies.pending, (state) => {
        state.isLoading = true
        state.errors.searchError = null
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.isLoading = false
        state.movieLists.searchResults = [...state.movieLists.searchResults, ...action.payload.results]
        state.pagination.searchResults.totalPages = action.payload.total_pages
        state.pagination.searchResults.currentPage += 1
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.isLoading = false
        state.errors.searchError = action.error.message || null
      })
  },
})

export const { resetSearch } = moviesSlice.actions
export default moviesSlice.reducer
