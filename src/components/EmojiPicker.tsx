import React, { useRef, useState } from 'react';
import { Data as EmojiDataSet, EmojiData, I18n } from 'emoji-mart';
// @ts-expect-error
import NimbleEmojiPicker from 'emoji-mart/dist/components/picker/nimble-picker.js';

import defaultEmojiData from '../utils/emojiData';
import { useTranslationContext } from '../context';
import { useOnClickOutside } from '../hooks/useOnClickOutside';
import { EmojiIcon } from './Icons';
import { TFunction } from 'i18next';

export type EmojiPickerProps = {
  /** Override the default emoji dataset, library has a light set of emojis
   * to show more emojis use your own or emoji-mart sets
   * https://github.com/missive/emoji-mart#datasets
   */
  emojiData?: EmojiDataSet;
  i18n?: Partial<I18n>;
  onSelect?: (emoji: EmojiData) => void;
};

export const getEmojiPickerFieldsTranslations = (t: TFunction): I18n => ({
  search: t('Search'),
  // todo: remove @ts-ignore after fixed I18n type definition in emoji-mart package
  // @ts-ignore
  clear: t('Clear'),
  notfound: t('No emoji found'),
  skintext: t('Choose your default skin tone'),
  categorieslabel: t('Emoji categories'),
  categories: {
    search: t('Search Results'),
    recent: t('Frequently Used'),
    people: t('Smileys & People'),
    nature: t('Animals & Nature'),
    foods: t('Food & Drink'),
    activity: t('Activity'),
    places: t('Travel & Places'),
    objects: t('Objects'),
    symbols: t('Symbols'),
    flags: t('Flags'),
    custom: t('Custom'),
  },
});

export const EmojiPicker = ({ emojiData = defaultEmojiData, i18n, onSelect }: EmojiPickerProps) => {
  const { t } = useTranslationContext();
  const [open, setOpen] = useState(false);
  const emojiPicker = useRef<HTMLDivElement>(null);

  useOnClickOutside(emojiPicker, () => setOpen(false), open);

  return (
    <div className="raf-emoji-picker">
      {open && (
        <div data-testid="picker-wrapper" className="raf-emoji-picker__container" ref={emojiPicker}>
          <NimbleEmojiPicker
            i18n={i18n ?? getEmojiPickerFieldsTranslations(t)}
            emoji="point_up"
            title={t('Pick your emoji')}
            data={emojiData}
            onSelect={onSelect}
          />
        </div>
      )}
      <div role="button" onClick={() => setOpen(true)} className="raf-emoji-picker__button">
        <EmojiIcon />
      </div>
    </div>
  );
};
