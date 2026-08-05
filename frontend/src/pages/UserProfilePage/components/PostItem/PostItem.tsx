type PostItemProp = {
  imageUrl: string;
};

const PostItem = ({ imageUrl }: PostItemProp) => {
  return (
    <>
      <div
        data-cursor="hover"
        className="relative group w-full max-w-[120px] sm:max-w-[200px] lg:max-w-[300px]"
      >
        <img
          className="object-cover border-1 border-solid group-hover:brightness-50 transition-all"
          src={imageUrl}
        />

        <p className="absolute inset-0 flex justify-center items-center text-white opacity-0 group-hover:opacity-100">
          Likes
        </p>
      </div>
    </>
  );
};

export default PostItem;
