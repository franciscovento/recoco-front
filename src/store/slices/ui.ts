import { User } from '@/lib/interfaces/user.interface';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UiState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: UiState = {
  isAuthenticated: false,
  user: null,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setUserMe: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: uiActions, reducer: uiReducer } = uiSlice;

export default uiReducer;
