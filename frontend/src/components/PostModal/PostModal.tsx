import { useGetPostByIdQuery } from '@/services/post-service'
import type { FC } from 'react'
import { Button } from '@/components/ui/button'
import { TypographyP } from '@/components/ui/typography'
import { X, Loader } from 'lucide-react'

type PostModalProps = {
  postId: string
  onClose: () => void
}

const PostModal: FC<PostModalProps> = ({ postId, onClose }) => {
  const { data: post } = useGetPostByIdQuery(postId!, {
    skip: !postId,
  })

  console.log(post)

  if (!post) return <Loader className='h-6 w-6 animate-spin' />

  return (
    <>
      <div className='absolute flex justify-evenly inset-0 w-full bg-black text-white p-20'>
        <img src={post.imageUrl} />
        <div className='flex gap-2 items-center justify-center'>
          <img src={post.owner.avatarUrl} className='w-7S h-7' />
          <TypographyP className='!m-0'>{post.owner.nickname}</TypographyP>
        </div>
        <Button className='absolute top-2 right-2' onClick={onClose}>
          {<X />}
        </Button>
      </div>
    </>
  )
}

export default PostModal
