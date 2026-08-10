import { useGetPostsByUserIdQuery } from "@/services/post-service";
import { Loader } from "lucide-react";
import PostItem from "../PostItem/PostItem";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import PostModal from "@/components/PostModal/PostModal";

type PostListProp = {
  userId: string;
};

const PostList = ({ userId }: PostListProp) => {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
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
      <div className="w-full px-10 lg:px-30 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {posts.map((post) => (
          <PostItem
            key={post.id}
            imageUrl={post.imageUrl}
            onOpen={() => setSelectedPost(post.id)}
          />
        ))}
      </div>
      {selectedPost ? (
        <PostModal
          postId={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      ) : null}
    </>
  );
};

export default PostList;
