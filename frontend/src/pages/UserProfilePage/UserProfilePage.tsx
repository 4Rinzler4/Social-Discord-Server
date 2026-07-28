import UserHeader from "@/pages/UserProfilePage/components/UserHeader/UserHeader";
import { useGetMeQuery } from "@/services/user-service";
import { useParams } from "react-router-dom";
import PostList from "./components/PostList/PostList";

const UserProfilePage = () => {
  const { data: me } = useGetMeQuery();
  const { userId } = useParams<{ userId: string }>();

  const profileId = userId ?? me?.id;

  if (!profileId) {
    return (
      <>
        <p>User not found</p>
      </>
    );
  }

  return (
    <>
      <UserHeader userId={profileId} />
      <PostList userId={profileId} />
    </>
  );
};

export default UserProfilePage;
