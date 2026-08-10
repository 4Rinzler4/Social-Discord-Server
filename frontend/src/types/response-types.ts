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
  owner: {
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
