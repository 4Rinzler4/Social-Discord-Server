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
  authChecked: boolean;
};

const initialState: UserState = {
  userId: "",
  userName: "",
  userFullName: "",
  userAvatar: "",
  authChecked: false,
};

type AccessToken = {
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
      const userData: AccessToken = parseJwt(action.payload);
      state.userId = userData.userId;
      state.userName = userData.userName;
      state.userFullName = userData.userFullName;
      state.userAvatar = userData.userAvatar;
      state.authChecked = true;
    },
    logout(state) {
      state.userId = initialState.userId;
      state.userName = initialState.userName;
      state.userFullName = initialState.userFullName;
      state.userAvatar = initialState.userAvatar;
      state.authChecked = initialState.authChecked;
    },
  },
});

export const { setUser } = mainSlice.actions;
export default mainSlice.reducer;
