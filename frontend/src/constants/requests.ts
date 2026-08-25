export const URLs = {
  auth: {
    refresh: '/auth/refresh',
    signUp: '/auth/signup',
    login: '/auth/login',
    logout: '/auth/logout',
    forgetPassword: '',
    resetPassword: '',
  },
  user: {
    get: '/user',
    myProfile: '/auth/me',
    updateLanguage: '/user/me/language',
  },
  post: {
    get: '/post',
    create: '/post/create',
    delete: '/post',
    getByUserId: '/post/user',
  },
  comment: {
    getCommentsByPost: '/comment/post',
    create: '/comment/create',
    delete: '/comment',
  },
}
