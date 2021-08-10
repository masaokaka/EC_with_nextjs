import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export const SidenavSlice = createSlice({
  name: "sidenav",
  initialState: false,
  reducers: {
    toggle: (state, action: PayloadAction<boolean>) => {
      return (state = action.payload);
    },
  },
});

export const { toggle } = SidenavSlice.actions;
export const selectSidenav = (state: RootState) => state.sidenav;

export default SidenavSlice.reducer;
