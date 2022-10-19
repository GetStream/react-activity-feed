import { TFunction } from 'i18next';
import moment from 'moment';
import Dayjs from 'dayjs';
import { enTranslations } from './locales';
import 'dayjs/locale/nl';
import 'dayjs/locale/ru';
import 'dayjs/locale/tr';
import 'dayjs/locale/fr';
import 'dayjs/locale/hi';
import 'dayjs/locale/it';
import 'dayjs/locale/es';
import 'dayjs/locale/en';
import { UR } from 'getstream';
import { TranslationContextValue } from '../context';
declare type Options = {
    DateTimeParser?: typeof Dayjs;
    dayjsLocaleConfigForLanguage?: Partial<ILocale>;
    debug?: boolean;
    disableDateTimeTranslations?: boolean;
    language?: string;
    logger?: (msg?: string) => void;
    translationsForLanguage?: typeof enTranslations;
};
export declare type TDateTimeParser = (input?: string | number | Date) => Dayjs.Dayjs | moment.Moment;
export declare type LanguageCallbackFn = (t: TFunction) => void;
export declare class Streami18n {
    i18nInstance: import("i18next").i18n;
    Dayjs: null;
    setLanguageCallback: LanguageCallbackFn;
    initialized: boolean;
    t: TFunction;
    tDateTimeParser: TDateTimeParser;
    translations: Record<string, Record<string, typeof enTranslations | UR>>;
    /**
     * dayjs.updateLocale('nl') also changes the global locale. We don't want to do that
     * when user calls registerTranslation() function. So intead we will store the locale configs
     * given to registerTranslation() function in `dayjsLocales` object, and register the required locale
     * with moment, when setLanguage is called.
     * */
    dayjsLocales: Record<string, Partial<ILocale>>;
    /**
     * Initialize properties used in constructor
     */
    logger: (msg: string) => void;
    currentLanguage: string;
    DateTimeParser: typeof Dayjs;
    isCustomDateTimeParser: boolean;
    i18nextConfig: {
        debug: boolean;
        fallbackLng: false;
        interpolation: {
            escapeValue: boolean;
        };
        keySeparator: false;
        lng: string;
        nsSeparator: false;
        parseMissingKeyHandler: (key: string) => string;
    };
    /**
     * Contructor accepts following options:
     *  - language (String) default: 'en'
     *    Language code e.g., en, tr
     *
     *  - translationsForLanguage (object)
     *    Translations object. Please check src/i18n/en.json for example.
     *
     *  - disableDateTimeTranslations (boolean) default: false
     *    Disable translations for datetimes
     *
     *  - debug (boolean) default: false
     *    Enable debug mode in internal i18n class
     *
     *  - logger (function) default: () => {}
     *    Logger function to log warnings/errors from this class
     *
     *  - dayjsLocaleConfigForLanguage (object) default: 'enConfig'
     *    [Config object](https://momentjs.com/docs/#/i18n/changing-locale/) for internal moment object,
     *    corresponding to language (param)
     *
     *  - DateTimeParser (function) Moment or Dayjs instance/function.
     *    Make sure to load all the required locales in this Moment or Dayjs instance that you will be provide to Streami18n
     *
     * @param {*} options
     */
    constructor(options?: Options);
    /**
     * Initializes the i18next instance with configuration (which enables natural language as default keys)
     */
    init(): Promise<TranslationContextValue>;
    localeExists: (language: string) => boolean;
    validateCurrentLanguage: () => void;
    /** Returns an instance of i18next used within this class instance */
    geti18Instance: () => import("i18next").i18n;
    /** Returns list of available languages. */
    getAvailableLanguages: () => string[];
    /** Returns all the translation dictionary for all inbuilt-languages */
    getTranslations: () => Record<string, Record<string, {
        "1 comment": string;
        "1 like": string;
        "1 repost": string;
        Activity: string;
        "Animals & Nature": string;
        "Choose your default skin tone": string;
        Clear: string;
        Custom: string;
        Details: string;
        "Emoji categories": string;
        Flags: string;
        "Food & Drink": string;
        "Frequently Used": string;
        "Getting website data...": string;
        "Load activities": string;
        "Load more": string;
        "New Post": string;
        "No data to display...": string;
        "No emoji found": string;
        Objects: string;
        "Pick your emoji": string;
        Post: string;
        Search: string;
        "Search Results": string;
        "Smileys & Emotion": string;
        "Start Typing...": string;
        Symbols: string;
        "Travel & Places": string;
        "Type your post...": string;
        "You have 1 new notification": string;
        "You have {{ notificationCount }} new notifications": string;
        "{{ actorName }} and 1 other commented on your {{ activityVerb }}": string;
        "{{ actorName }} and 1 other followed you": string;
        "{{ actorName }} and 1 other liked your {{ activityVerb }}": string;
        "{{ actorName }} and 1 other reposted your {{ activityVerb }}": string;
        "{{ actorName }} and {{ countOtherActors }} others commented on your {{ activityVerb }}": string;
        "{{ actorName }} and {{ countOtherActors }} others followed you": string;
        "{{ actorName }} and {{ countOtherActors }} others liked your {{ activityVerb }}": string;
        "{{ actorName }} and {{ countOtherActors }} others reposted your {{ activityVerb }}": string;
        "{{ actorName }} commented on your {{ activityVerb }}": string;
        "{{ actorName }} followed you": string;
        "{{ actorName }} liked your {{ activityVerb }}": string;
        "{{ actorName }} reposted your {{ activityVerb }}": string;
        "{{ countComments }} comments": string;
        "{{ countLikes }} likes": string;
        "{{ countReposts }} reposts": string;
    } | UR>>;
    /**
     * Returns current version translator function.
     */
    getTranslators(): Promise<TranslationContextValue>;
    /**
     * Register translation
     */
    registerTranslation(language: string, translation: typeof enTranslations, customDayjsLocale?: Partial<ILocale>): void;
    addOrUpdateLocale(key: string, config: Partial<ILocale>): void;
    /**
     * Changes the language.
     */
    setLanguage(language: string): Promise<TFunction | undefined>;
    registerSetLanguageCallback(callback: LanguageCallbackFn): void;
}
export {};
//# sourceMappingURL=Streami18n.d.ts.map