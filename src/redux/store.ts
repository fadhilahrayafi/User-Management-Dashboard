import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice"; // Import the reducer

export const store = configureStore({
  reducer: {
    counter: counterReducer, // Add reducers here
  },
});

// Define TypeScript types for the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;