import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tutorsReducer from './tutors/tutorReducer';
import citiesReducer from './cities/citiesSlice';
import departmentsReducer from './departments/departmentsReducer';
import { customMiddlewareLogger } from './Middleware/customMiddlewareLogger';

const persistCitiesConfig = {
  key: 'filter',
  storage,
  whitelist: ['filter'],
};

/*

STORE = {
  tutors: {
    items: [],
    firstLoading: false
    loading: false,
    error: null
  }

  cities: {
    data: {
      item : []
      loading: false,
      error: null
    },
    filter: ""
  }

  departments:{
    items: [],
    loading: false,
    error: null
  }
}

*/

const store = configureStore({
  reducer: {
    tutors: tutorsReducer,
    cities: persistReducer(persistCitiesConfig, citiesReducer),
    departments: departmentsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(customMiddlewareLogger),
  devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);

export { store, persistor };
