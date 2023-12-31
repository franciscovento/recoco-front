import { configureStore } from '@reduxjs/toolkit';
import { recocoApi } from './api/recocoApi';
import uiReducer from './slices/ui';
import teacherClassReducer from './slices/teacher-class';

export const store = configureStore({
  reducer: {
    [recocoApi.reducerPath]: recocoApi.reducer,
    ui: uiReducer,
    teacherClass: teacherClassReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(recocoApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
