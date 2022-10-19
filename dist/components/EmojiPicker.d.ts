/// <reference types="react" />
import { Data as EmojiDataSet, EmojiData, I18n } from 'emoji-mart';
import { TFunction } from 'i18next';
import { PartialI18n } from 'emoji-mart/dist-es/utils/shared-props';
import { PropsWithElementAttributes } from '../utils';
export declare type EmojiPickerProps = PropsWithElementAttributes<{
    /** Override the default emoji dataset, library has a light set of emojis
     * to show more emojis use your own or emoji-mart sets
     * https://github.com/missive/emoji-mart#datasets
     */
    emojiData?: EmojiDataSet;
    i18n?: PartialI18n;
    onSelect?: (emoji: EmojiData) => void;
}>;
export declare const getEmojiPickerFieldsTranslations: (t: TFunction) => I18n;
export declare const EmojiPicker: ({ emojiData, i18n, onSelect, className, style }: EmojiPickerProps) => JSX.Element;
//# sourceMappingURL=EmojiPicker.d.ts.map