import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from '../localization/en.json';
import ru from '../localization/ru.json';
import {LangType} from '../types/LangType';

export const defaultNS = 'common';

export const resources = {
    ru: {
        translation: ru,
    },
    en: {
        translation: en,
    },
};

i18n.use(initReactI18next).init({
    resources,
    debug: true,
    lng: LangType.EN,
    compatibilityJSON: 'v3',
    returnNull: false,
    interpolation: {
        escapeValue: false,
    },
});

export const Localization = i18n;
