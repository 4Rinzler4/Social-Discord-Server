import { useGetPostsByUserIdQuery } from "@/services/post-service";
import { Loader } from "lucide-react";
import PostItem from "../PostItem/PostItem";
import { Button } from "@/components/ui/button";

type PostListProp = {
  userId: string;
};

const PostList = ({ userId }: PostListProp) => {
  const { data: posts, isLoading } = useGetPostsByUserIdQuery(userId);

  if (isLoading) {
    return <Loader />;
  }

  if (!posts) {
    return null;
  }

  if (posts.length === 0) {
    return (
      <>
        <p className="text-white">No posts yet.</p>
        <Button>Add Post</Button>
      </>
    );
  }

  return (
    <>
      <div className="text-white">
        {posts.map((post) => (
          <PostItem imageUrl={post.imageUrl} />
        ))}
      </div>
    </>
  );
};

export default PostList;
