import i18n, { TFunction } from 'i18next';
import Dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import updateLocale from 'dayjs/plugin/updateLocale';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import localeData from 'dayjs/plugin/localeData';
import relativeTime from 'dayjs/plugin/relativeTime';

import {
  enTranslations,
  nlTranslations,
  ruTranslations,
  trTranslations,
  frTranslations,
  hiTranslations,
  itTranslations,
} from './locales';

const defaultNS = 'translation';
const defaultLng = 'en';

import 'dayjs/locale/nl';
import 'dayjs/locale/ru';
import 'dayjs/locale/tr';
import 'dayjs/locale/fr';
import 'dayjs/locale/hi';
import 'dayjs/locale/it';
// These locale imports also set these locale globally.
// So As a last step I am going to import english locale
// to make sure I don't mess up language at other places in app.
import 'dayjs/locale/en';
import { UnknownRecord } from 'getstream';

Dayjs.extend(updateLocale);

Dayjs.updateLocale('nl', {
  calendar: {
    sameDay: '[vandaag om] LT',
    nextDay: '[morgen om] LT',
    nextWeek: 'dddd [om] LT',
    lastDay: '[gisteren om] LT',
    lastWeek: '[afgelopen] dddd [om] LT',
    sameElse: 'L',
  },
});
Dayjs.updateLocale('it', {
  calendar: {
    sameDay: '[Oggi alle] LT',
    nextDay: '[Domani alle] LT',
    nextWeek: 'dddd [alle] LT',
    lastDay: '[Ieri alle] LT',
    lastWeek: '[lo scorso] dddd [alle] LT',
    sameElse: 'L',
  },
});
Dayjs.updateLocale('hi', {
  calendar: {
    sameDay: '[आज] LT',
    nextDay: '[कल] LT',
    nextWeek: 'dddd, LT',
    lastDay: '[कल] LT',
    lastWeek: '[पिछले] dddd, LT',
    sameElse: 'L',
  },
  // Hindi notation for meridiems are quite fuzzy in practice. While there exists
  // a rigid notion of a 'Pahar' it is not used as rigidly in modern Hindi.
  meridiemParse: /रात|सुबह|दोपहर|शाम/,
  meridiemHour(hour: number, meridiem: string) {
    if (hour === 12) {
      hour = 0;
    }
    if (meridiem === 'रात') {
      return hour < 4 ? hour : hour + 12;
    } else if (meridiem === 'सुबह') {
      return hour;
    } else if (meridiem === 'दोपहर') {
      return hour >= 10 ? hour : hour + 12;
    } else if (meridiem === 'शाम') {
      return hour + 12;
    }
    return hour;
  },
  meridiem(hour: number) {
    if (hour < 4) {
      return 'रात';
    } else if (hour < 10) {
      return 'सुबह';
    } else if (hour < 17) {
      return 'दोपहर';
    } else if (hour < 20) {
      return 'शाम';
    } else {
      return 'रात';
    }
  },
});
Dayjs.updateLocale('fr', {
  calendar: {
    sameDay: '[Aujourd’hui à] LT',
    nextDay: '[Demain à] LT',
    nextWeek: 'dddd [à] LT',
    lastDay: '[Hier à] LT',
    lastWeek: 'dddd [dernier à] LT',
    sameElse: 'L',
  },
});
Dayjs.updateLocale('tr', {
  calendar: {
    sameDay: '[bugün saat] LT',
    nextDay: '[yarın saat] LT',
    nextWeek: '[gelecek] dddd [saat] LT',
    lastDay: '[dün] LT',
    lastWeek: '[geçen] dddd [saat] LT',
    sameElse: 'L',
  },
});
Dayjs.updateLocale('ru', {
  calendar: {
    sameDay: '[Сегодня, в] LT',
    nextDay: '[Завтра, в] LT',
    lastDay: '[Вчера, в] LT',
  },
});

const en_locale = {
  formats: {},
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  relativeTime: {},
  weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
};

type Options = {
  DateTimeParser?: typeof Dayjs;
  dayjsLocaleConfigForLanguage?: Partial<ILocale>;
  debug?: boolean;
  disableDateTimeTranslations?: boolean;
  language?: string;
  logger?: (msg?: string) => void;
  translationsForLanguage?: typeof enTranslations;
};

const defaultStreami18nOptions = {
  language: 'en',
  disableDateTimeTranslations: false,
  debug: false,
  logger: (msg: string) => console.warn(msg),
  dayjsLocaleConfigForLanguage: null,
  DateTimeParser: Dayjs,
};

export type TDateTimeParser = (input?: string | Date | Dayjs.Dayjs) => Dayjs.Dayjs;

export type LanguageCallbackFn = (t: TFunction) => void;

export class Streami18n {
  i18nInstance = i18n.createInstance();
  Dayjs = null;
  setLanguageCallback: LanguageCallbackFn = () => {}; // eslint-disable-line @typescript-eslint/no-empty-function
  initialized = false;

  t: TFunction = (key: string) => key;
  tDateTimeParser: TDateTimeParser;

  translations: Record<string, Record<string, typeof enTranslations | UnknownRecord>> = {
    en: { [defaultNS]: enTranslations },
    nl: { [defaultNS]: nlTranslations },
    ru: { [defaultNS]: ruTranslations },
    tr: { [defaultNS]: trTranslations },
    fr: { [defaultNS]: frTranslations },
    hi: { [defaultNS]: hiTranslations },
    it: { [defaultNS]: itTranslations },
  };
  /**
   * dayjs.updateLocale('nl') also changes the global locale. We don't want to do that
   * when user calls registerTranslation() function. So intead we will store the locale configs
   * given to registerTranslation() function in `dayjsLocales` object, and register the required locale
   * with moment, when setLanguage is called.
   * */
  dayjsLocales: Record<string, Partial<ILocale>> = {};

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
    interpolation: { escapeValue: boolean };
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
  constructor(options: Options = {}) {
    const finalOptions = {
      ...defaultStreami18nOptions,
      ...options,
    };
    // Prepare the i18next configuration.
    this.logger = finalOptions.logger;

    this.currentLanguage = finalOptions.language;
    this.DateTimeParser = finalOptions.DateTimeParser;

    try {
      // This is a shallow check to see if given parser is instance of Dayjs.
      // For some reason Dayjs.isDayjs(this.DateTimeParser()) doesn't work.
      if (this.DateTimeParser && this.DateTimeParser.extend) {
        this.DateTimeParser.extend(LocalizedFormat);
        this.DateTimeParser.extend(calendar);
        this.DateTimeParser.extend(localeData);
        this.DateTimeParser.extend(relativeTime);
      }
    } catch (error) {
      throw Error(
        `Streami18n: Looks like you wanted to provide Dayjs instance, but something went wrong while adding plugins ${error}`,
      );
    }

    this.isCustomDateTimeParser = !!options.DateTimeParser;
    const translationsForLanguage = finalOptions.translationsForLanguage;

    if (translationsForLanguage) {
      this.translations[this.currentLanguage] = {
        [defaultNS]: translationsForLanguage,
      };
    }

    // If translations don't exist for given language, then set it as empty object.
    if (!this.translations[this.currentLanguage]) {
      this.translations[this.currentLanguage] = {
        [defaultNS]: {},
      };
    }

    this.i18nextConfig = {
      nsSeparator: false,
      keySeparator: false,
      fallbackLng: false,
      debug: finalOptions.debug,
      lng: this.currentLanguage,
      interpolation: { escapeValue: false },

      parseMissingKeyHandler: (key) => {
        this.logger(`Streami18n: Missing translation for key: ${key}`);

        return key;
      },
    };

    this.validateCurrentLanguage();

    const dayjsLocaleConfigForLanguage = finalOptions.dayjsLocaleConfigForLanguage;

    if (dayjsLocaleConfigForLanguage) {
      this.addOrUpdateLocale(this.currentLanguage, {
        ...dayjsLocaleConfigForLanguage,
      });
    } else if (!this.localeExists(this.currentLanguage)) {
      this.logger(
        `Streami18n: Streami18n(...) - Locale config for ${this.currentLanguage} does not exist in momentjs.` +
          `Please import the locale file using "import 'moment/locale/${this.currentLanguage}';" in your app or ` +
          `register the locale config with Streami18n using registerTranslation(language, translation, customDayjsLocale)`,
      );
    }

    this.tDateTimeParser = (timestamp) => {
      if (finalOptions.disableDateTimeTranslations || !this.localeExists(this.currentLanguage)) {
        return this.DateTimeParser(timestamp).locale(defaultLng);
      }
      return this.DateTimeParser(timestamp).locale(this.currentLanguage);
    };
  }

  /**
   * Initializes the i18next instance with configuration (which enables natural language as default keys)
   */
  async init() {
    this.validateCurrentLanguage();

    try {
      this.t = await this.i18nInstance.init({
        ...this.i18nextConfig,
        resources: this.translations,
        lng: this.currentLanguage,
      });
      this.initialized = true;
    } catch (error) {
      this.logger(`Something went wrong with init: ${error}`);
    }

    return {
      t: this.t,
      tDateTimeParser: this.tDateTimeParser,
    };
  }

  localeExists = (language: string) => {
    if (this.isCustomDateTimeParser) return true;

    return Object.keys(Dayjs.Ls).indexOf(language) > -1;
  };

  validateCurrentLanguage = () => {
    const availableLanguages = Object.keys(this.translations);
    if (availableLanguages.indexOf(this.currentLanguage) === -1) {
      this.logger(
        `Streami18n: '${this.currentLanguage}' language is not registered.` +
          ` Please make sure to call streami18n.registerTranslation('${this.currentLanguage}', {...}) or ` +
          `use one the built-in supported languages - ${this.getAvailableLanguages()}`,
      );

      this.currentLanguage = defaultLng;
    }
  };

  /** Returns an instance of i18next used within this class instance */
  geti18Instance = () => this.i18nInstance;

  /** Returns list of available languages. */
  getAvailableLanguages = () => Object.keys(this.translations);

  /** Returns all the translation dictionary for all inbuilt-languages */
  getTranslations = () => this.translations;

  /**
   * Returns current version translator function.
   */
  async getTranslators() {
    if (!this.initialized) {
      if (this.dayjsLocales[this.currentLanguage]) {
        this.addOrUpdateLocale(this.currentLanguage, this.dayjsLocales[this.currentLanguage]);
      }
      return await this.init();
    } else {
      return {
        t: this.t,
        tDateTimeParser: this.tDateTimeParser,
      };
    }
  }

  /**
   * Register translation
   */
  registerTranslation(language: string, translation: typeof enTranslations, customDayjsLocale?: Partial<ILocale>) {
    if (!translation) {
      this.logger(
        `Streami18n: registerTranslation(language, translation, customDayjsLocale) called without translation`,
      );
      return;
    }

    if (!this.translations[language]) {
      this.translations[language] = { [defaultNS]: translation };
    } else {
      this.translations[language][defaultNS] = translation;
    }

    if (customDayjsLocale) {
      this.dayjsLocales[language] = { ...customDayjsLocale };
    } else if (!this.localeExists(language)) {
      this.logger(
        `Streami18n: registerTranslation(language, translation, customDayjsLocale) - ` +
          `Locale config for ${language} does not exist in Dayjs.` +
          `Please import the locale file using "import 'dayjs/locale/${language}';" in your app or ` +
          `register the locale config with Streami18n using registerTranslation(language, translation, customDayjsLocale)`,
      );
    }

    if (this.initialized) {
      this.i18nInstance.addResources(language, defaultNS, translation);
    }
  }

  addOrUpdateLocale(key: string, config: Partial<ILocale>) {
    if (this.localeExists(key)) {
      Dayjs.updateLocale(key, { ...config });
    } else {
      // Merging the custom locale config with en config, so missing keys can default to english.
      Dayjs.locale({ name: key, ...en_locale, ...config }, undefined, true);
    }
  }

  /**
   * Changes the language.
   */
  async setLanguage(language: string) {
    this.currentLanguage = language;

    if (!this.initialized) return;

    try {
      const t = await this.i18nInstance.changeLanguage(language);
      if (this.dayjsLocales[language]) {
        this.addOrUpdateLocale(this.currentLanguage, this.dayjsLocales[this.currentLanguage]);
      }

      this.setLanguageCallback(t);
      return t;
    } catch (e) {
      this.logger(`Failed to set language: ${e}`);
      return this.t;
    }
  }

  registerSetLanguageCallback(callback: LanguageCallbackFn) {
    this.setLanguageCallback = callback;
  }
}
