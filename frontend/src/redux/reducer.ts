import { AuthService } from "@/services/auth-service";
import { parseJwt } from "@/utils/helper-functions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type User = {
  id: string;
  userName: string;
  fullName: string;
  avatar: string;
  status: string;
};

type UserState = {
  user: User | null;
  authChecked: boolean;
};

const initialState: UserState = {
  user: null,
  authChecked: false,
};

type JwtPayload = {
  userId: string;
  userName: string;
  userFullName: string;
  userAvatar: string;
};

export const checkAuth = createAsyncThunk(
  "appUser/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await AuthService.refresh();
      return data.accessToken;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

const mapJwtToUser = (token: string): User => {
  const data = parseJwt<JwtPayload>(token);
  return {
    id: data.userId,
    userName: data.userName,
    fullName: data.userFullName,
    avatar: data.userAvatar,
    status: "",
  };
};

const userSlice = createSlice({
  name: "appUser",
  initialState,
  reducers: {
    setUser(state, action) {
      try {
        state.user = mapJwtToUser(action.payload);
        state.authChecked = true;
      } catch {
        Object.assign(state, initialState);
      }
    },
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        const data = parseJwt<JwtPayload>(action.payload);

        state.user = {
          id: data.userId,
          userName: data.userName,
          fullName: data.userFullName,
          avatar: data.userAvatar,
          status: "",
        };

        state.authChecked = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authChecked = true;
        state.user = null;
      });
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
