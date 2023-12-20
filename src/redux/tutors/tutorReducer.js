import { createReducer, combineReducers } from '@reduxjs/toolkit';

// {
//   "firstName": "Мария",
//     "lastName": "Руденко",
//       "gender": "женщина",
//         "phone": "+38(097) 448 73 11",
//           "email": "rudenko@gmail.com",
//             "city": "Полтава",
//               "isFullTime": true
// }
import {
  getTutorsRequest,
  getTutorsSuccess,
  getTutorsError,
  addTutorRequest,
  addTutorSuccess,
  addTutorError,
} from './tutorsActions';

const itemsReducer = createReducer([], builder => {
  builder.addCase(getTutorsSuccess, (_, action) => action.payload || []);
  builder.addCase(addTutorSuccess, (state, action) => [
    ...state,
    action.payload,
  ]);
});

const firstLoadingReducer = createReducer(false, builder => {
  builder
    .addCase(getTutorsRequest, () => true)
    .addCase(getTutorsSuccess, () => false)
    .addCase(getTutorsError, () => false);
});

const loadingReducer = createReducer(false, builder => {
  builder
    .addCase(getTutorsRequest, () => true)
    .addCase(getTutorsSuccess, () => false)
    .addCase(getTutorsError, () => false)

    .addCase(addTutorRequest, () => true)
    .addCase(addTutorSuccess, () => false)
    .addCase(addTutorError, () => false);
});

const errorReducer = createReducer(null, builder => {
  builder
    .addCase(getTutorsRequest, () => null)
    .addCase(getTutorsError, (_, { payload }) => payload)

    .addCase(addTutorRequest, () => null)
    .addCase(addTutorError, (_, { payload }) => payload);
});

const tutorsReducer = combineReducers({
  items: itemsReducer,
  loading: loadingReducer,
  firstLoading: firstLoadingReducer,
  error: errorReducer,
});

export default tutorsReducer;
