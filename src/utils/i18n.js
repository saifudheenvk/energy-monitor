import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {initReactI18next} from 'react-i18next';
import translationEng from "./locales/en/translations.json";
import translationArb from "./locales/ar/translations.json";
import translationHin from "./locales/hin/translations.json";
import XHR from "i18next-xhr-backend";
i18n.use(XHR)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        lng: "en",
        fallbackLng: "en",
        keySeparator: false,
        interpolation: {
            escapeValue: false
        },
        resources: {
            en: {
                translations: translationEng
            },
            ar: {
                translations: translationArb
            },
            hin: {
                translations: translationHin
            }

        },
        ns: ["translations"],
        defaultNS: "translations"
    });
export default i18n;