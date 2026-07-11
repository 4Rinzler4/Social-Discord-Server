import { URLs } from "@/constants/requests";
import { axiosClient } from "@/plugins/axiosClient";
import type { AxiosResponse } from "axios";

export const userService = {
  getUserById: async ({ userId }): Promise<AxiosResponse<UserResponse>> => {
    return await axiosClient.get<UserResponse>(`${URLs.user.get}/${userId}`);
  },
};
