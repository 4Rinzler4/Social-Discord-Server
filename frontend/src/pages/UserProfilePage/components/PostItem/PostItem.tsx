import { Heart, MessageCircle } from 'lucide-react'
import type { FC } from 'react'

type PostItemProp = {
  imageUrl: string
  comments: number
  likes: number
  onOpen: () => void
}

const PostItem: FC<PostItemProp> = ({ imageUrl, comments, likes, onOpen }) => {
  return (
    <>
      <div
        onClick={onOpen}
        data-cursor='hover'
        className='relative max-w-[360px] group aspect-[4x3]'
      >
        <img
          className='object-cover group-hover:brightness-50 transition-all'
          src={imageUrl}
        />
        <div className='absolute inset-0 flex justify-center gap-4 items-center text-white opacity-0 group-hover:opacity-100'>
          <p className='flex items-center gap-2 font-semibold'>
            <Heart />
            {likes}
          </p>
          <p className='flex items-center gap-2 font-semibold'>
            <MessageCircle />
            {comments}
          </p>
        </div>
      </div>
    </>
  )
}

export default PostItem
