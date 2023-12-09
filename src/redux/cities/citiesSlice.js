import { createSlice } from "@reduxjs/toolkit";
import { getCities, addCity, editCity, deleteCity } from "./citiesOperations";

const initialState = {
  data: {
    items: [],
    loading: false,
    error: null,
  },
  filter: "",
};

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    changeFilter: (state, { payload }) => {
      state.filter = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCities.pending, (state) => {
        state.data.loading = true;
        state.data.error = null;
      })
      .addCase(getCities.fulfilled, (state, { payload }) => {
        state.data.loading = false;
        state.data.items = payload;
      })
      .addCase(getCities.rejected, (state, { payload }) => {
        state.data.loading = false;
        state.data.error = payload;
      })

      .addCase(addCity.pending, (state) => {
        state.data.loading = true;
        state.data.error = null;
      })
      .addCase(addCity.fulfilled, (state, { payload }) => {
        state.data.loading = false;
        state.data.items = [...state.data.items, payload];
      })
      .addCase(addCity.rejected, (state, { payload }) => {
        state.data.loading = false;
        state.data.error = payload;
      })

      .addCase(editCity.pending, (state) => {
        state.data.loading = true;
        state.data.error = null;
      })
      .addCase(editCity.fulfilled, (state, { payload }) => {
        state.data.loading = false;
        const idx = state.data.items.findIndex(
          (city) => city.id === payload.id,
        );
        state.data.items[idx] = payload;
      })
      .addCase(editCity.rejected, (state, { payload }) => {
        state.data.loading = false;
        state.data.error = payload;
      })

      .addCase(deleteCity.pending, (state) => {
        state.data.loading = true;
        state.data.error = null;
      })
      .addCase(deleteCity.fulfilled, (state, { payload }) => {
        state.data.loading = false;
        const idx = state.data.items.findIndex(
          (city) => city.id === payload.id,
        );
        state.data.items.splice(idx, 1);
      })
      .addCase(deleteCity.rejected, (state, { payload }) => {
        state.data.loading = false;
        state.data.error = payload;
      });
  },
});

export const { changeFilter } = citiesSlice.actions;

export default citiesSlice.reducer;
