// src/features/albums/albumsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  albums: [],
  status: 'idle',
  error: null,
};

export const fetchAlbums = createAsyncThunk('albums/fetchAlbums', async (artistId) => {
  const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_SPOTIFY_ACCESS_TOKEN}`
    }
  });
  return response.data.items;
});

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.albums = action.payload;
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default albumsSlice.reducer;
