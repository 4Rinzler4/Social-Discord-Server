import HeroImage from "@/assets/images/hero.png";
import MobileHeroImage from "@/assets/images/mobile-hero.png";

const HeaderHero = () => {
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
        <div className="absolute top-1/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:hidden">
          <h1>Welcome to Our Site</h1>
        </div>
      </section>
    </>
  );
};

export default HeaderHero;
