import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useDeletePostMutation } from '@/services/postService'
import { Ellipsis, Trash } from 'lucide-react'
import { useEffect, type FC } from 'react'

type PostDropMenuProps = {
  postId: string
  onClose: () => void
}

const PostDropMenu: FC<PostDropMenuProps> = ({ postId, onClose }) => {
  const [deletePost, { isSuccess }] = useDeletePostMutation()

  const handleDelete = () => {
    deletePost(postId)
    onClose()
  }

  useEffect(() => {
    if (isSuccess) {
      onClose()
    }
  }, [postId, isSuccess, onClose])

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            data-cursor='hover'
            variant='ghost'
            size='icon'
            className='h-10 w-10'
          >
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='hover:bg-white'>
          <DropdownMenuItem
            variant='destructive'
            className='flex justify-end font-bold bg-black'
            onClick={handleDelete}
          >
            Delete <Trash className='h-4 w-4' />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default PostDropMenu
