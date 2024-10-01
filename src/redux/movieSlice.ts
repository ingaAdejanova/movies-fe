import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../api/fetcher';
import { API_URL } from '../api/url';

interface MovieState {
  popularMovies: any[];
  searchResults: any[];
  loading: boolean;
  error: string | null;
  currentPopularPage: number;
  currentSearchPage: number;
  totalPopularPages: number;
  totalSearchPages: number;
}

const initialState: MovieState = {
  popularMovies: [],
  searchResults: [],
  loading: false,
  error: null,
  currentPopularPage: 1,
  currentSearchPage: 1,
  totalPopularPages: 1,
  totalSearchPages: 1,
};

export const fetchPopularMovies = createAsyncThunk('movies/fetchPopularMovies', async (page: number) => {
  const response = await fetchData({
    url: API_URL.POPULAR_MOVIES,
    params: { page },
  });
  return response;
});

export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async ({ query, page }: { query: string; page: number }) => {
    const response = await fetchData({
      url: API_URL.SEARCH_MOVIES,
      params: { query, page },
    });
    return response;
  }
);

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    resetSearch(state) {
      state.searchResults = [];
      state.currentSearchPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.popularMovies = [...state.popularMovies, ...action.payload.results];
        state.totalPopularPages = action.payload.total_pages;
        state.currentPopularPage += 1;
      })
      .addCase(fetchPopularMovies.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = [...state.searchResults, ...action.payload.results];
        state.totalSearchPages = action.payload.total_pages;
        state.currentSearchPage += 1;
      })
      .addCase(searchMovies.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetSearch } = moviesSlice.actions;

export default moviesSlice.reducer;