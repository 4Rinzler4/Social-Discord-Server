import { useGetAllCommentsByPostIdQuery } from '@/services/commentService'
import type { FC } from 'react'

type CommentListProps = {
  postId: string
}

const CommentList: FC<CommentListProps> = ({ postId }) => {
  const { data: comments = [] } = useGetAllCommentsByPostIdQuery(postId)
  return <>{comments.length}</>
}
export default CommentList
