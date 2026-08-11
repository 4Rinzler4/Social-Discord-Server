import Loader from '@/components/Loader/Loader'
import SuccessPostModal from '@/components/SuccessPostModal/SuccessPostModal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TypographyH4 } from '@/components/ui/typography'
import { useModalContext } from '@/context/modalContext'
import { useCreatePostMutation } from '@/services/postService'
import { useEffect, useState } from 'react'
import Dropzone from 'react-dropzone'

const CreatePostInput = () => {
  const [preview, setPreview] = useState<string>('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [description, setDescription] = useState<string>('')
  const { openModal } = useModalContext()

  const [createPost, { isLoading, isSuccess }] = useCreatePostMutation()

  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setImageFile(file)
  }

  const handleReset = () => {
    setImageFile(null)
    setPreview('')
    setDescription('')
  }

  const handleSaveDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }

  const handleCreatePost = async () => {
    if (!imageFile) return
    try {
      await createPost({
        image: imageFile,
        description,
      }).unwrap()
      handleReset()
    } catch (error) {
      console.log('Create post error.', error)
    }
  }

  useEffect(() => {
    if (!imageFile) {
      setPreview('')
      return
    }
    const objectUrl = URL.createObjectURL(imageFile)
    setPreview(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [imageFile])

  useEffect(() => {
    if (isSuccess) {
      openModal({ component: <SuccessPostModal /> })
      handleReset()
    }
  }, [isSuccess, openModal])

  if (isLoading) {
    return <Loader pageLoading />
  }

  return (
    <>
      <div className='flex flex-col lg:flex-row w-full h-full px-10 bg justify-center items-center lg:justify-center gap-5'>
        {preview ? (
          <div className='sm:w-[500px] sm:h-[500px] rounded-[10px] overflow-hidden bg-zinc-900'>
            <img
              src={preview}
              className='w-full h-full object-cover'
              alt='Preview'
            />
          </div>
        ) : null}
        <Dropzone onDrop={handleDrop}>
          {({ getRootProps, getInputProps }) => (
            <div>
              {imageFile ? null : (
                <div
                  data-cursor='hover'
                  className='flex items-center justify-center border-2 border-dashed border-gray-300 p-4 w-full max-w-[300px] h-100 md:max-w-[450px] rounded-[8px] text-center text-white'
                  {...getRootProps()}
                >
                  <p>Drag 'n' drop an image here, or click to select one</p>
                  <input {...getInputProps()} />
                </div>
              )}
            </div>
          )}
        </Dropzone>
        <div className='flex flex-col w-full max-w-[300px] lg:h-100 justify-center gap-5'>
          <div className='flex flex-col gap-3 text-center'>
            <TypographyH4 className='text-white'>
              Add some Description
            </TypographyH4>
            <Input
              value={description}
              onChange={handleSaveDescription}
              className='text-white'
              placeholder='Add description...'
            />
          </div>
          <div className='flex w-full justify-evenly'>
            <Button
              data-cursor='hover'
              type='button'
              variant='destructive'
              className='w-full max-w-[120px]'
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              type='submit'
              onClick={handleCreatePost}
              variant='default'
              className='w-full max-w-[120px]'
              disabled={!imageFile}
            >
              Upload
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreatePostInput
