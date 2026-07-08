export const ApiMethod = {
  POST: "POST",
  PATCH: "PATCH",
  DELETE: "DELETE",
} as const;

export type ApiMethod = (typeof ApiMethod)[keyof typeof ApiMethod];
