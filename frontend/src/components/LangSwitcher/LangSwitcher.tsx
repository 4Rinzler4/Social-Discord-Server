import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import i18n from "@/plugins/i18n";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const LangSwitcher = () => {
  const { t } = useTranslation();

  const [language, setLanguage] = useState(i18n.language);

  const handleChangeLang = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <Select value={language} onValueChange={handleChangeLang}>
      <SelectTrigger className="w-[250px] text-white">
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
