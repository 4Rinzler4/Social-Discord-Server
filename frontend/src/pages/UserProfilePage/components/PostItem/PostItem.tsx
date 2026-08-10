type PostItemProp = {
  imageUrl: string
  onOpen: () => void
}

const PostItem = ({ imageUrl, onOpen }: PostItemProp) => {
  return (
    <>
      <div
        onClick={onOpen}
        data-cursor='hover'
        className='relative max-w-[300px] group aspect-[4x3]'
      >
        <img
          className='object-cover border-1 border-solid group-hover:brightness-50 transition-all'
          src={imageUrl}
        />

        <p className='absolute inset-0 flex justify-center items-center text-white opacity-0 group-hover:opacity-100'>
          Likes
        </p>
      </div>
    </>
  )
}

export default PostItem
