import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const CommentInput = () => {
  return (
    <>
      <div className='w-full flex gap-2'>
        <Input />
        <Button data-cursor='hover'>Send</Button>
      </div>
    </>
  )
}

export default CommentInput
