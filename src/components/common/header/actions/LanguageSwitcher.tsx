import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import languages from "../../../../i18n/languages";

function LanguageSwitcher() {
    const { i18n } = useTranslation()
    const [ lang, setLang ] = useState<string>(i18n.language)

    const changeLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
        const requestedLanguage = e.target.value

        setLang(requestedLanguage)
        i18n.changeLanguage(requestedLanguage)
    }

    return (
        <>
            <select value={lang} className="language-switcher" onChange={(e) => changeLanguage(e)}>
                {languages.map(language => 
                    <option value={language.code}>{language.nativeName}</option>
                )}
            </select>
        </>
    )
}

export default LanguageSwitcher