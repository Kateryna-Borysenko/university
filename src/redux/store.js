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
import authReducer from './auth/authSlice';
import tutorsReducer from './tutors/tutorReducer';
import citiesReducer from './cities/citiesSlice';
import departmentsReducer from './departments/departmentsReducer';
import univerReducer from './univer/univer-slice';
import { customMiddlewareLogger } from './Middleware/customMiddlewareLogger';

const persistCitiesConfig = {
  key: 'filter',
  storage,
  whitelist: ['filter'],
};

const persistAuthConfig = {
  key: 'token',
  storage,
  whitelist: ['token', 'refreshToken'],
};

/*

STORE = {
  
  auth: {
  user: {name: null, email: null}
  token: null //for firebase
  localId: null //for firebase
  refreshToken: null
  loading: false //when log in or log up 
  loadingUser: false //when user has already log in an get some user info 
  error: null
  }

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

  univer:{
    image: null,
    loading: false,
    error: null
  }
}

*/

const store = configureStore({
  reducer: {
    auth: persistReducer(persistAuthConfig, authReducer),
    tutors: tutorsReducer,
    cities: persistReducer(persistCitiesConfig, citiesReducer),
    departments: departmentsReducer,
    univer: univerReducer,
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
