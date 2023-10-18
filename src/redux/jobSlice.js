import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mainJobs: [],
  jobs: [],
  initialized: false,
  isError: false,
};
const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJob: (state, action) => {
      state.jobs = action.payload;
      state.mainJobs = action.payload;
      state.initialized = true;
    },
    setError: (state) => {
      state.isError = true;
      state.initialized = true;
    },
    filterBySearch: (state, action) => {
      const query = action.payload.toLowerCase();
      const filter = state.mainJobs.filter((job) =>
        job.company.toLowerCase().includes(query)
      );
      state.jobs = filter;
    },
    filterByStatus: (state, action) => {
      const filtered = state.mainJobs.filter(
        (job) => job.status === action.payload
      );
      state.jobs = filtered;
    },
    filterByType: (state, action) => {
      console.log(action);
      const filtered = state.mainJobs.filter(
        (job) => job.type === action.payload
      );
      state.jobs = filtered;
    },
    sortJobs: (state, action) => {
      switch (action.payload) {
        case "A-Z":
          state.jobs.sort((a, b) => a.company.localeCompare(b.company));
          break;
        case "Z-A":
          state.jobs.sort((a, b) => b.company.localeCompare(a.company));
          break;
        case "Newest":
          state.jobs.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case "Oldest":
          state.jobs.sort((a, b) => new Date(a.date) - new Date(b.date));
          break;
        default:
          return state;
      }
    },
    clearFilters: (state) => {
      state.jobs = state.mainJobs;

      //|| form elemanlarını sıfırla
    },
  },
});

export const {
  setJob,
  setError,
  filterBySearch,
  filterByStatus,
  filterByType,
  sortJobs,
  clearFilters,
} = jobSlice.actions;
export default jobSlice.reducer;
