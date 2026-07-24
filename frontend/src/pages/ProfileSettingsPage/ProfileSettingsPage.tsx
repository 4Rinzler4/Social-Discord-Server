import LangSwitcher from "@/components/LangSwitcher/LangSwitcher";

const ProfileSettingsPage = () => {
  return (
    <>
      <div className="text-white p-5">
        <h1>Edit Profile</h1>
        <div>
          <p>App Language</p>
          <LangSwitcher />
        </div>
      </div>
    </>
  );
};

export default ProfileSettingsPage;
