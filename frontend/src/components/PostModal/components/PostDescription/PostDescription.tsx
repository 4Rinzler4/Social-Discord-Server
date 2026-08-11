import type { FC } from 'react'

type PostDescriptionProps = {
  avatarUrl: string
  nickname: string
  description: string
}

const PostDescription: FC<PostDescriptionProps> = ({
  avatarUrl,
  nickname,
  description,
}) => {
  return (
    <>
      <div className='flex w-full  gap-2'>
        <div className='flex items-center gap-2'>
          <img
            src={avatarUrl}
            alt={nickname}
            className='h-7 w-7 rounded-full'
          />
          <p className='!m-0 font-semibold'>{nickname}:</p>
        </div>
        <div>
          <p className='!m-0'>{description}</p>
        </div>
      </div>
    </>
  )
}

export default PostDescription
