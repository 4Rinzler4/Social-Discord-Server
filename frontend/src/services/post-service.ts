import { appApi } from "@/redux/apiSlice";
import { ApiMethod } from "@/types/enums/common-enums";
import type { PostResponse } from "@/types/response-types";

const { GET } = ApiMethod;

export const postsService = appApi.injectEndpoints({
  endpoints: (build) => ({
    getPostsByUserId: build.query<PostResponse[], string>({
      query: (userId) => ({ url: `${userId}`, method: GET }),
    }),
    getPostByUserId: build.query<PostResponse, string>({
      query: (userId) => ({ url: `${userId}`, method: GET }),
    }),
  }),
});
