import { configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // or another storage method
import exampleReducer from "./slices/exampleSlice";
const persistConfig = {
  key: "root",
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  storage,
  blacklist: ["exampleReducer"],
};

const persistedReducer = persistReducer(persistConfig, exampleReducer);

export const store = configureStore({
  reducer: {
    exampleReducer: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const example = (state: RootState) => state.exampleReducer.value;
