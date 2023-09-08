import { configureStore } from '@reduxjs/toolkit'
import chatReducer from '../redux/slices/index'
import { setupListeners } from '@reduxjs/toolkit/query'
import { pokemonApi } from '../services/index'

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
setupListeners(store.dispatch)