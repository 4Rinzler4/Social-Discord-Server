import { useGetPostsByUserIdQuery } from "@/services/post-service";
import { Loader } from "lucide-react";

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

  return <>{posts.length}</>;
};

export default PostList;
