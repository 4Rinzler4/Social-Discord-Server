import ProfileHeaderImg from "@/assets/images/profileHeader.avif";

const ProfileHeader = () => {
  return (
    <>
      <img
        className="h-full w-full object-cover blur brightness-140"
        src={ProfileHeaderImg}
        alt="Profile hero"
        draggable={false}
      />
    </>
  );
};

export default ProfileHeader;
