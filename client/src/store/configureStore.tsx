import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import { composeWithDevTools } from "redux-devtools-extension"; // Import Redux DevTools
import songReducer from "../redux/features/song/songSlice"; // Update the path to your reducer file

const store = configureStore({
  reducer: {
    song: songReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
  // enhancers: [composeWithDevTools()], // Add Redux DevTools enhancer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
