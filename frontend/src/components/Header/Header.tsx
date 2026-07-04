import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { FaDiscord } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import LangSwitcher from "../LangSwitcher/LangSwitcher";

const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handlePage = () => {
    navigate("/auth");
  };

  return (
    <div>
      <header className="absolute top-0 left-0 z-50 w-full border-b border-white/30 bg-transparent backdrop-blur-xs">
        <div className="w-full flex h-16 items-center justify-between px-20 ">
          <nav className="w-full hidden lg:flex items-center gap-20 font-oswald text-1xl">
            {[
              { to: "/", label: t("common.home") },
              { to: "/about", label: t("common.about") },
              { to: "/games", label: t("common.games") },
            ].map((item) => (
              <Link
                data-cursor="hover"
                key={item.to}
                to={item.to}
                className="w-25 group inline-flex relative overflow-hidden px-6 py-2"
              >
                <span className="absolute inset-0 -z-10 origin-left scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100" />
                <span className="text-white transition-colors duration-300 group-hover:text-black">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
          <div className="flex justify-end items-center gap-10">
            <Button
              data-cursor="hover"
              variant="default"
              size="icon-sm"
              className="w-full h-10 md:h-12 max-w-50 md:max-w-70 text-md md:text-2lg text-white gap-2 hover:bg-white hover:text-black transition-colors duration-300"
              onClick={handlePage}
            >
              {" "}
              <FaDiscord className="size-4 md:size-5" />
              {t("common.continueDiscord")}{" "}
            </Button>
            <LangSwitcher />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
