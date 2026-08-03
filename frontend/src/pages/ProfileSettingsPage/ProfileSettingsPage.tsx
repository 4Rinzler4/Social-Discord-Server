import LangSwitcher from "@/components/LangSwitcher/LangSwitcher";
import { useTranslation } from "react-i18next";

const ProfileSettingsPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex justify-center text-white p-5 absolute mt-15 w-full">
        <div className="bg-black/70 p-5 rounded-[20px]">
          <h1>{t("user.editProfile")}</h1>
          <div>
            <p>App Language</p>
            <LangSwitcher />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSettingsPage;
