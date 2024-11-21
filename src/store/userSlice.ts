import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
}

export const userSlice = createSlice({
  name: "users",
  initialState: [] as User[],
  reducers: {
    addUser: (state, action: PayloadAction<string>) => {
      const sanitizedName = action.payload.trim();
      if (sanitizedName) {
        state.push({
          id: `user_${Math.random().toString(36).substr(2, 9)}`,
          name: sanitizedName,
        });
      }
    },
    deleteUser: (state, action: PayloadAction<string>) =>
      state.filter((user) => user.id !== action.payload),
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { addUser, deleteUser, updateUser } = userSlice.actions;
