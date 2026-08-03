type PostItemProp = {
  imageUrl: string;
};

const PostItem = ({ imageUrl }: PostItemProp) => {
  return (
    <>
      <img src={imageUrl} />
    </>
  );
};

export default PostItem;
