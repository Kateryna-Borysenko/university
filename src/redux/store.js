import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import tutorsReducer from "./tutors/tutorReducer";

// {
//   tutors: [],
//   cities: {
//     items: [],
//     filter: '',
//   },
//   departments: [],
// }

const logger = createLogger({
  collapsed: (getState, action, logEntry) => !logEntry.error,
  timestamp: false,
});

const store = configureStore({
  reducer: {
    tutors: tutorsReducer,
    cities: () => [],
    departments: () => [],
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

const persistor = persistStore(store);

export { store, persistor };
