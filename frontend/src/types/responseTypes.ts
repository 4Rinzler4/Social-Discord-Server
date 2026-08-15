import type { Lang } from './commonTypes'

export type UserResponse = {
  id: string
  nickname: string
  fullname: string
  avatarUrl: string
  appLang: Lang
  posts: PostResponse[]
  followers: FollowersResponse[]
  followings: FollowingsResponse[]
}

export type LangParam = {
  appLang: Lang
}

export type PostResponse = {
  id: string
  imageUrl: string
  description?: string
  ownerId: string
  _count: {
    likes: number
    comments: number
  }
  createdAt: string
  owner: {
    id: string
    nickname: string
    avatarUrl: string
  }
}

export type CommentResponse = {
  id: string
  userId: string
  postId: string
  content: string
  createdAt: string
  user: {
    id: string
    nickname: string
    avatarUrl: string
  }
}

export type FollowersResponse = {
  userId: string
}

export type FollowingsResponse = {
  userId: string
}
