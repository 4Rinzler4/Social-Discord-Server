import { AuthService } from "@/services/auth-service";
import { parseJwt } from "@/utils/helper-functions";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

type UserState = {
  userId: string;
  userName: string;
  userFullName: string;
  userAvatar: string;
  userStatus: string;
  authChecked: boolean;
};

const initialState: UserState = {
  userId: "",
  userName: "",
  userFullName: "",
  userAvatar: "",
  userStatus: "",
  authChecked: false,
};

type JwtPayload = {
  userId: string;
  userName: string;
  userFullName: string;
  userAvatar: string;
};

export const checkAuth = createAsyncThunk(
  "appMain/checkAuth",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await AuthService.refresh();
      if (data) {
        dispatch(setUser(data.accessToken));
      }
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

const mainSlice = createSlice({
  name: "appMain",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<string>) {
      try {
        const userData = parseJwt<JwtPayload>(action.payload);
        state.userId = userData.userId;
        state.userName = userData.userName;
        state.userFullName = userData.userFullName;
        state.userAvatar = userData.userAvatar;
        state.authChecked = true;
      } catch {
        Object.assign(state, initialState);
      }
    },
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(checkAuth.fulfilled, (state) => {
      state.authChecked = true;
    });
  },
});

export const { setUser, logout } = mainSlice.actions;
export default mainSlice.reducer;
