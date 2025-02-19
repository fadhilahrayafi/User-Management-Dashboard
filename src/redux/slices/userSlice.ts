import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
  email: string;
  company: { name: string };
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

// Async thunk to fetch users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  return (await response.json()) as User[];
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    editUser: (state, action: PayloadAction<User>) => {
      state.users = state.users.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to fetch users";
      });
  },
});

export const { editUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;