import Loader from "@/components/Loader/Loader";
import { useGetMeQuery } from "@/services/user-service";

const UserProfilePage = () => {
  const { data, isLoading } = useGetMeQuery();

  if (isLoading) {
    return <Loader pageLoading />;
  }
  return (
    <>
      <h1 className="text-white">{data?.nickname}</h1>
      <p className="text-white">{data?.fullname}</p>
    </>
  );
};

export default UserProfilePage;
