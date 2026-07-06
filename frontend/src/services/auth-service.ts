import { URLs } from "@/constants/requests";
import { axiosClient } from "@/plugins/axiosClient";
import type { AxiosResponse } from "axios";

export const AuthService = {
  refresh: (): Promise<AxiosResponse> => {
    return axiosClient.get(URLs.auth.refresh, { withCredentials: true });
  },
};
