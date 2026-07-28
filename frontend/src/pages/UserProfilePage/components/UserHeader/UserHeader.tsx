import { Button } from "@/components/ui/button";
import { useGetMeQuery, useGetUserByIdQuery } from "@/services/user-service";
import { Loader } from "lucide-react";

type UserHeaderProp = {
  userId: string;
};

const UserHeader = ({ userId }: UserHeaderProp) => {
  const { data: me } = useGetMeQuery();
  const { data: user, isLoading } = useGetUserByIdQuery(userId);
  const isMyProfile = me?.id === user?.id;

  if (isLoading || !user) {
    return <Loader />;
  }

  const { nickname, fullname, avatarUrl, followers, followings, posts } = user;

  return (
    <>
      <header className="w-full flex justify-center  text-white p-5">
        <div className="flex items-center gap-5 md:gap-7">
          <img
            className="w-20 h-20 md:w-30 md:h-30 border-2 rounded-full"
            src={avatarUrl}
            alt="User Avatar"
          />
          <div className="w-full flex flex-col justify-start p-4">
            <h4 className="text-xl font-bold">{nickname}</h4>
            <p className="text-sm">{fullname}</p>
            <div className="flex text-center gap-10 py-2">
              <span>
                Posts <span className="font-bold px-2">{posts.length}</span>
              </span>
              <span>Followers {followers.length}</span>
              <span>Followings {followings.length}</span>
            </div>
            <div>
              {isMyProfile && (
                <>
                  <Button data-cursor="hover">Edit profile</Button>
                  <Button>Add post</Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default UserHeader;
