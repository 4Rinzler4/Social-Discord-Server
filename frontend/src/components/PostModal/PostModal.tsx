import { useGetMeQuery } from '@/services/userService'
import { TypographyP } from '@/components/ui/typography'
import { Loader, X } from 'lucide-react'
import PostDropMenu from '@/components/PostModal/components/PostDropMenu/PostDropMenu'
import { Button } from '@/components/ui/button'
import { useGetPostByIdQuery } from '@/services/postService'
import type { FC } from 'react'
import PostDescription from '@/components/PostModal/components/PostDescription/PostDescription'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import CommentInput from './components/CommentInput/CommentInput'

type PostModalProps = {
  postId: string
  onClose: () => void
}

const PostModal: FC<PostModalProps> = ({ postId, onClose }) => {
  const { data: post } = useGetPostByIdQuery(postId)
  const { data: me } = useGetMeQuery()

  if (!post) {
    return <Loader className='h-6 w-6 animate-spin' />
  }

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm text-white'
      onClick={onClose}
    >
      <div
        className='relative flex flex-col md:flex-row max-h-[100vh] max-w-7xl overflow-hidden rounded-sm bg-black border border-white'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className='flex items-center justify-center'>
          <img
            src={post.imageUrl}
            alt={post.owner.nickname}
            className='max-h-[100vh] max-w-full object-contain'
          />
        </div>

        {/* Right panel */}
        <div className='relative flex w-full md:w-96 flex-col justify-between bg-black p-4'>
          {/* User */}
          <div className='flex flex-col gap-2  pb-2'>
            <div className='flex'>
              <Avatar>
                <AvatarImage
                  src={post.owner.avatarUrl}
                  alt={post.owner.nickname}
                  className='h-7 w-7 rounded-full'
                />
              </Avatar>

              <TypographyP className='!m-0 font-semibold'>
                {post.owner.nickname}
              </TypographyP>
            </div>
            <div className='flex w-full border-t border-white pt-2'>
              {post.description ? (
                <PostDescription
                  avatarUrl={post.owner.avatarUrl}
                  nickname={post.owner.nickname}
                  description={post.description}
                />
              ) : null}
            </div>
          </div>

          {/* Menu */}
          {me?.id === post.owner.id && (
            <div className='absolute right-2 top-2'>
              <PostDropMenu postId={post.id} onClose={onClose} />
            </div>
          )}
          <div className=''>
            <CommentInput />
          </div>
        </div>
      </div>

      {/* Close */}
      <Button
        data-cursor='hover'
        variant='outline'
        className='absolute right-2 top-2 hover:bg-white hover:text-black'
        onClick={onClose}
      >
        <X />
      </Button>
    </div>
  )
}

export default PostModal
