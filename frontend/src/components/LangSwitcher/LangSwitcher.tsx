import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const LangSwitcher = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const handleChangeLang = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  useEffect(() => {
    const savedLng = localStorage.getItem("lang") ?? "en";
    i18n.changeLanguage(savedLng);
  }, [i18n]);

  return (
    <Select value={language} onValueChange={handleChangeLang}>
      <SelectTrigger className="w-[140px] md:w-[200px]  text-white">
        <SelectValue placeholder={t("common.lang")} />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t("common.lang")}</SelectLabel>

          <SelectItem value="uk">{t("common.uk")}</SelectItem>

          <SelectItem value="en">{t("common.en")}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LangSwitcher;
