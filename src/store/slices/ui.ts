import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UiState {
  isAuthenticated: boolean;
}

const initialState: UiState = {
  isAuthenticated: false,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { actions: uiActions, reducer: uiReducer } = uiSlice;

export default uiReducer;
