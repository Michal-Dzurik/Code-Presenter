// @ts-ignore
import { configureStore } from '@reduxjs/toolkit';
import card from './redux/features/card';

export const store = configureStore({
    reducer: {
        card: card,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
