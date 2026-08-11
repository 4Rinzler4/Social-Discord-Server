import { TypographyH4 } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { useModalContext } from '@/context/modalContext'

const SuccessPostModal = () => {
  const { closeModal } = useModalContext()

  return (
    <>
      <div className='text-white w-full p-10 flex flex-col items-center gap-4'>
        <TypographyH4>Congratulations!</TypographyH4>
        <p>Your post has been successfully uploaded.</p>
        <Button
          data-cursor='hover'
          variant='default'
          className='bg-white text-black hover:text-white hover:border-white hover:bg-black'
          onClick={closeModal}
        >
          Awesome
        </Button>
      </div>
    </>
  )
}

export default SuccessPostModal
