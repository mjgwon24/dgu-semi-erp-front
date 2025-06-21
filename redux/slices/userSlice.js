import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserAndClubs = createAsyncThunk(
  'user/fetchUserAndClubs',
  async (_, { rejectWithValue }) => {
    try {
      const userRes = await axios.get("/user/me", { withCredentials: true });
      const clubsRes = await axios.get("/user/me/club", { withCredentials: true });
      return {
        user: userRes.data,
        clubs: clubsRes.data.content,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Error fetching data');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    clubs: [],
    loading: false,
    error: null,
  },
  reducers: {
    setEmail(state, action) {
      if (state.user) state.user.email = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAndClubs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserAndClubs.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.clubs = action.payload.clubs;
      })
      .addCase(fetchUserAndClubs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setEmail } = userSlice.actions;
export default userSlice.reducer;
