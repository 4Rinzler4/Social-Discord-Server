import { Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { FaDiscord } from "react-icons/fa";
import type { FC } from "react";
import type { BurgerMenuProps } from "@/types/types-props";

const BurgerMenu: FC<BurgerMenuProps> = ({ navItems }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handlePage = () => {
    navigate("/auth");
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="flex items-center justify-center rounded-md p-2 hover:bg-white/10 transition-all"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6 text-white" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-full max-w-[200px] max-h-[280px] border-1 bg-black text-white px-8"
      >
        <nav className="mt-10 w-full">
          {navItems.map((item) => (
            <Link
              data-cursor="hover"
              key={item.to}
              to={item.to}
              className="w-35 group flex direction-column relative overflow-hidden px-6 py-2"
            >
              <span className="absolute inset-0 -z-10 origin-left scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100" />
              <span className="text-white text-lg transition-colors duration-300 group-hover:text-black">
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
        <div className="w-full flex justify-center">
          <Button
            data-cursor="hover"
            variant="default"
            className="px-20 h-10 md:h-12 max-w-30 md:max-w-70 text-xs md:text-lg text-black gap-2 bg-white hover:bg-white/20 hover:text-white text-wrap transition-colors duration-300"
            onClick={handlePage}
          >
            <FaDiscord className="size-4 md:size-5" />
            {t("common.continueDiscord")}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BurgerMenu;
