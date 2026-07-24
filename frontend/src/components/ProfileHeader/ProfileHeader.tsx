import ProfileHeaderImg from "@/assets/images/profileHeader.avif";

const ProfileHeader = () => {
  return (
    <>
      <img
        className="h-20 object-cover border-b border-2-white"
        src={ProfileHeaderImg}
        alt="profileHeader"
      />
    </>
  );
};

export default ProfileHeader;
