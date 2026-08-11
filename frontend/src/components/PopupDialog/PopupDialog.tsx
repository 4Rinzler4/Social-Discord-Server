import type { FC, ReactElement } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

type PopupDialogProps = {
  content: ReactElement | null
  closeModal: () => void
}

const PopupDialog: FC<PopupDialogProps> = ({ content, closeModal }) => {
  if (!content) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='relative rounded-lg bg-black border-2 border-white p-6'>
        <Button
          data-cursor='hover'
          className='absolute right-2 top-2 bg-white text-black hover:text-white hover:border-white hover:bg-black'
          onClick={closeModal}
        >
          {<X />}
        </Button>

        {content}
      </div>
    </div>
  )
}

export default PopupDialog
