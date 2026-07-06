import HeroImage from "@/assets/images/hero.png";
import MobileHeroImage from "@/assets/images/mobile-hero.png";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { HiArrowUpRight } from "react-icons/hi2";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const HeaderHero = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handlePage = () => {
    navigate("/auth");
  };
  return (
    <>
      <section className="relative h-screen w-full">
        <picture className="absolute top-0 left-0 w-full h-full">
          <source media="(max-width: 1156px)" srcSet={MobileHeroImage} />
          <img
            src={HeroImage}
            alt="Hero Image"
            className="h-full w-full object-cover object-center brightness-75"
          />
        </picture>
        <div className="absolute top-1/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:hidden bg-white p-3">
          <TypographyH1>Shade Garden</TypographyH1>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div></div>
          <div>
            <Button
              data-cursor="hover"
              className="flex content-center items-center gap-3 px-8 py-6 border-3-black bg-white text-black hover:bg-black hover:text-white"
              onClick={handlePage}
            >
              <TypographyP className="text-[15px] md:text-[18px]">
                Join us
              </TypographyP>
              <HiArrowUpRight className="size-5" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeaderHero;
