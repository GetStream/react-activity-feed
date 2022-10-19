import { __assign, __awaiter, __generator } from "tslib";
import i18n from 'i18next';
import Dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import updateLocale from 'dayjs/plugin/updateLocale';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import localeData from 'dayjs/plugin/localeData';
import relativeTime from 'dayjs/plugin/relativeTime';
import { enTranslations, nlTranslations, ruTranslations, trTranslations, frTranslations, hiTranslations, itTranslations, esTranslations, } from './locales';
var defaultNS = 'translation';
var defaultLng = 'en';
import 'dayjs/locale/nl';
import 'dayjs/locale/ru';
import 'dayjs/locale/tr';
import 'dayjs/locale/fr';
import 'dayjs/locale/hi';
import 'dayjs/locale/it';
import 'dayjs/locale/es';
// These locale imports also set these locale globally.
// So As a last step I am going to import english locale
// to make sure I don't mess up language at other places in app.
import 'dayjs/locale/en';
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
    meridiemHour: function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'रात') {
            return hour < 4 ? hour : hour + 12;
        }
        else if (meridiem === 'सुबह') {
            return hour;
        }
        else if (meridiem === 'दोपहर') {
            return hour >= 10 ? hour : hour + 12;
        }
        else if (meridiem === 'शाम') {
            return hour + 12;
        }
        return hour;
    },
    meridiem: function (hour) {
        if (hour < 4) {
            return 'रात';
        }
        else if (hour < 10) {
            return 'सुबह';
        }
        else if (hour < 17) {
            return 'दोपहर';
        }
        else if (hour < 20) {
            return 'शाम';
        }
        else {
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
Dayjs.updateLocale('es', {
    calendar: {
        sameDay: '[Hoy a] LT',
        nextDay: '[Mañana a] LT',
        lastDay: '[Ayer a] LT',
    },
});
var en_locale = {
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
var defaultStreami18nOptions = {
    language: 'en',
    disableDateTimeTranslations: false,
    debug: false,
    logger: function (msg) { return console.warn(msg); },
    dayjsLocaleConfigForLanguage: null,
    DateTimeParser: Dayjs,
};
// Type guards to check DayJs
var isDayJs = function (dateTimeParser) {
    return dateTimeParser.extend !== undefined;
};
var Streami18n = /** @class */ (function () {
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
    function Streami18n(options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        var _this = this;
        if (options === void 0) { options = {}; }
        this.i18nInstance = i18n.createInstance();
        this.Dayjs = null;
        this.setLanguageCallback = function () { }; // eslint-disable-line @typescript-eslint/no-empty-function
        this.initialized = false;
        this.t = function (key) { return key; };
        this.translations = {
            en: (_a = {}, _a[defaultNS] = enTranslations, _a),
            nl: (_b = {}, _b[defaultNS] = nlTranslations, _b),
            ru: (_c = {}, _c[defaultNS] = ruTranslations, _c),
            tr: (_d = {}, _d[defaultNS] = trTranslations, _d),
            fr: (_e = {}, _e[defaultNS] = frTranslations, _e),
            hi: (_f = {}, _f[defaultNS] = hiTranslations, _f),
            it: (_g = {}, _g[defaultNS] = itTranslations, _g),
            es: (_h = {}, _h[defaultNS] = esTranslations, _h),
        };
        /**
         * dayjs.updateLocale('nl') also changes the global locale. We don't want to do that
         * when user calls registerTranslation() function. So intead we will store the locale configs
         * given to registerTranslation() function in `dayjsLocales` object, and register the required locale
         * with moment, when setLanguage is called.
         * */
        this.dayjsLocales = {};
        this.localeExists = function (language) {
            if (_this.isCustomDateTimeParser)
                return true;
            return Object.keys(Dayjs.Ls).indexOf(language) > -1;
        };
        this.validateCurrentLanguage = function () {
            var availableLanguages = Object.keys(_this.translations);
            if (availableLanguages.indexOf(_this.currentLanguage) === -1) {
                _this.logger("Streami18n: '" + _this.currentLanguage + "' language is not registered." +
                    (" Please make sure to call streami18n.registerTranslation('" + _this.currentLanguage + "', {...}) or ") +
                    ("use one the built-in supported languages - " + _this.getAvailableLanguages()));
                _this.currentLanguage = defaultLng;
            }
        };
        /** Returns an instance of i18next used within this class instance */
        this.geti18Instance = function () { return _this.i18nInstance; };
        /** Returns list of available languages. */
        this.getAvailableLanguages = function () { return Object.keys(_this.translations); };
        /** Returns all the translation dictionary for all inbuilt-languages */
        this.getTranslations = function () { return _this.translations; };
        var finalOptions = __assign(__assign({}, defaultStreami18nOptions), options);
        // Prepare the i18next configuration.
        this.logger = finalOptions.logger;
        this.currentLanguage = finalOptions.language;
        this.DateTimeParser = finalOptions.DateTimeParser;
        try {
            // This is a shallow check to see if given parser is instance of Dayjs.
            // For some reason Dayjs.isDayjs(this.DateTimeParser()) doesn't work.
            if (this.DateTimeParser && isDayJs(this.DateTimeParser)) {
                this.DateTimeParser.extend(LocalizedFormat);
                this.DateTimeParser.extend(calendar);
                this.DateTimeParser.extend(localeData);
                this.DateTimeParser.extend(relativeTime);
            }
        }
        catch (error) {
            throw Error("Streami18n: Looks like you wanted to provide Dayjs instance, but something went wrong while adding plugins " + error);
        }
        this.isCustomDateTimeParser = !!options.DateTimeParser;
        var translationsForLanguage = finalOptions.translationsForLanguage;
        if (translationsForLanguage) {
            this.translations[this.currentLanguage] = (_j = {},
                _j[defaultNS] = translationsForLanguage,
                _j);
        }
        // If translations don't exist for given language, then set it as empty object.
        if (!this.translations[this.currentLanguage]) {
            this.translations[this.currentLanguage] = (_k = {},
                _k[defaultNS] = {},
                _k);
        }
        this.i18nextConfig = {
            nsSeparator: false,
            keySeparator: false,
            fallbackLng: false,
            debug: finalOptions.debug,
            lng: this.currentLanguage,
            interpolation: { escapeValue: false },
            parseMissingKeyHandler: function (key) {
                _this.logger("Streami18n: Missing translation for key: " + key);
                return key;
            },
        };
        this.validateCurrentLanguage();
        var dayjsLocaleConfigForLanguage = finalOptions.dayjsLocaleConfigForLanguage;
        if (dayjsLocaleConfigForLanguage) {
            this.addOrUpdateLocale(this.currentLanguage, __assign({}, dayjsLocaleConfigForLanguage));
        }
        else if (!this.localeExists(this.currentLanguage)) {
            this.logger("Streami18n: Streami18n(...) - Locale config for " + this.currentLanguage + " does not exist in momentjs." +
                ("Please import the locale file using \"import 'moment/locale/" + this.currentLanguage + "';\" in your app or ") +
                "register the locale config with Streami18n using registerTranslation(language, translation, customDayjsLocale)");
        }
        this.tDateTimeParser = function (timestamp) {
            if (finalOptions.disableDateTimeTranslations || !_this.localeExists(_this.currentLanguage)) {
                return _this.DateTimeParser(timestamp).locale(defaultLng);
            }
            return _this.DateTimeParser(timestamp).locale(_this.currentLanguage);
        };
    }
    /**
     * Initializes the i18next instance with configuration (which enables natural language as default keys)
     */
    Streami18n.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.validateCurrentLanguage();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = this;
                        return [4 /*yield*/, this.i18nInstance.init(__assign(__assign({}, this.i18nextConfig), { resources: this.translations, lng: this.currentLanguage }))];
                    case 2:
                        _a.t = _b.sent();
                        this.initialized = true;
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        this.logger("Something went wrong with init: " + error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, {
                            t: this.t,
                            tDateTimeParser: this.tDateTimeParser,
                        }];
                }
            });
        });
    };
    /**
     * Returns current version translator function.
     */
    Streami18n.prototype.getTranslators = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.initialized) return [3 /*break*/, 2];
                        if (this.dayjsLocales[this.currentLanguage]) {
                            this.addOrUpdateLocale(this.currentLanguage, this.dayjsLocales[this.currentLanguage]);
                        }
                        return [4 /*yield*/, this.init()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/, {
                            t: this.t,
                            tDateTimeParser: this.tDateTimeParser,
                        }];
                }
            });
        });
    };
    /**
     * Register translation
     */
    Streami18n.prototype.registerTranslation = function (language, translation, customDayjsLocale) {
        var _a;
        if (!translation) {
            this.logger("Streami18n: registerTranslation(language, translation, customDayjsLocale) called without translation");
            return;
        }
        if (!this.translations[language]) {
            this.translations[language] = (_a = {}, _a[defaultNS] = translation, _a);
        }
        else {
            this.translations[language][defaultNS] = translation;
        }
        if (customDayjsLocale) {
            this.dayjsLocales[language] = __assign({}, customDayjsLocale);
        }
        else if (!this.localeExists(language)) {
            this.logger("Streami18n: registerTranslation(language, translation, customDayjsLocale) - " +
                ("Locale config for " + language + " does not exist in Dayjs.") +
                ("Please import the locale file using \"import 'dayjs/locale/" + language + "';\" in your app or ") +
                "register the locale config with Streami18n using registerTranslation(language, translation, customDayjsLocale)");
        }
        if (this.initialized) {
            this.i18nInstance.addResources(language, defaultNS, translation);
        }
    };
    Streami18n.prototype.addOrUpdateLocale = function (key, config) {
        if (this.localeExists(key)) {
            Dayjs.updateLocale(key, __assign({}, config));
        }
        else {
            // Merging the custom locale config with en config, so missing keys can default to english.
            Dayjs.locale(__assign(__assign({ name: key }, en_locale), config), undefined, true);
        }
    };
    /**
     * Changes the language.
     */
    Streami18n.prototype.setLanguage = function (language) {
        return __awaiter(this, void 0, void 0, function () {
            var t, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.currentLanguage = language;
                        if (!this.initialized)
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.i18nInstance.changeLanguage(language)];
                    case 2:
                        t = _a.sent();
                        if (this.dayjsLocales[language]) {
                            this.addOrUpdateLocale(this.currentLanguage, this.dayjsLocales[this.currentLanguage]);
                        }
                        this.setLanguageCallback(t);
                        return [2 /*return*/, t];
                    case 3:
                        e_1 = _a.sent();
                        this.logger("Failed to set language: " + e_1);
                        return [2 /*return*/, this.t];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Streami18n.prototype.registerSetLanguageCallback = function (callback) {
        this.setLanguageCallback = callback;
    };
    return Streami18n;
}());
export { Streami18n };
//# sourceMappingURL=Streami18n.js.map