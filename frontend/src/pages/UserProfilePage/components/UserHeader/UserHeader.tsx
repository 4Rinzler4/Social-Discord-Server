import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TypographyP } from "@/components/ui/typography";
import { useGetMeQuery, useGetUserByIdQuery } from "@/services/user-service";
import { Loader } from "lucide-react";
import { useTranslation } from "react-i18next";

type UserHeaderProp = {
  userId: string;
};

const UserHeader = ({ userId }: UserHeaderProp) => {
  const { data: me } = useGetMeQuery();
  const { data: user, isLoading } = useGetUserByIdQuery(userId);
  const isMyProfile = me?.id === user?.id;
  const { t } = useTranslation();

  if (isLoading || !user) {
    return <Loader />;
  }

  const { nickname, fullname, avatarUrl, followers, followings, posts } = user;

  return (
    <>
      <header className="w-full flex justify-center text-white p-5 mt-5">
        <div className="flex items-center gap-1 md:gap-7 bg-black/65 py-1 md:py-3 px-5 md:px-10 rounded-[20px]">
          <img
            className="w-15 h-15 md:w-30 md:h-30 border-2 rounded-full"
            src={avatarUrl}
            alt="User Avatar"
            draggable={false}
          />
          <div className="w-full flex flex-col justify-start p-4">
            <h4 className="text-xs md:text-xl font-bold">{nickname}</h4>
            <p className="text-sm">{fullname}</p>
            <div className="flex text-center gap-2 md:gap-5 py-2">
              <div className="flex flex-col items-center text-center">
                <TypographyP className="text-sm md:text-lg">Posts</TypographyP>
                <span className="font-bold">{posts.length}</span>
              </div>
              <Separator orientation="vertical" className="w-[1px]" />
              <div className="flex flex-col items-center text-center">
                <TypographyP className="text-sm md:text-lg">
                  Followers
                </TypographyP>
                <span className="font-bold">{followers.length}</span>
              </div>
              <Separator orientation="vertical" className="w-[1px]" />
              <div className="flex flex-col">
                <TypographyP className="text-sm md:text-lg">
                  Followings
                </TypographyP>
                <span className="font-bold px-2">{followings.length}</span>
              </div>
            </div>
            <div>
              {isMyProfile && (
                <>
                  <Button
                    data-cursor="hover"
                    className="w-full font-bold hover:bg-white hover:text-black"
                  >
                    {t("user.editProfile")}
                  </Button>
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
