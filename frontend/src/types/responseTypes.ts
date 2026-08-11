export type UserResponse = {
  id: string
  nickname: string
  fullname: string
  avatarUrl: string
  posts: PostResponse[]
  followers: FollowersResponse[]
  followings: FollowingsResponse[]
}

export type PostResponse = {
  id: string
  imageUrl: string
  description?: string
  ownerId: string
  likes: LikeResponse[]
  comments: CommentResponse[]
  createdAt: string
  owner: {
    id: string
    nickname: string
    avatarUrl: string
  }
}

export type LikeResponse = {
  userId: string
  postId: string
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
