import React, { useRef, useState } from 'react';
import { EmojiData, Data as EmojiDataSet, I18n } from 'emoji-mart';
import { NimblePicker } from 'emoji-mart';

import defaultEmojiData from '../utils/emojiData';
import { useTranslationContext } from '../context';
import { useOnClickOutside } from '../hooks/useOnClickOutside';
import { EmojiIcon } from './Icons';

export type EmojiPickerProps = {
  /** Override the default emoji dataset, library has a light set of emojis
   * to show more emojis use your own or emoji-mart sets
   * https://github.com/missive/emoji-mart#datasets
   */
  emojiData?: EmojiDataSet;
  i18n?: Partial<I18n>;
  onSelect?: (emoji: EmojiData) => void;
};

export const EmojiPicker = ({ emojiData = defaultEmojiData, i18n, onSelect }: EmojiPickerProps) => {
  const { t } = useTranslationContext();
  const [open, setOpen] = useState(false);
  const emojiPicker = useRef<HTMLDivElement>(null);

  useOnClickOutside(emojiPicker, () => setOpen(false), open);

  return (
    <div className="raf-emoji-picker">
      {open && (
        <div data-testid="picker-wrapper" className="raf-emoji-picker__container" ref={emojiPicker}>
          <NimblePicker
            emoji="point_up"
            title={t('Pick your emoji')}
            data={emojiData}
            onSelect={onSelect}
            i18n={i18n}
          />
        </div>
      )}
      <div role="button" onClick={() => setOpen(true)} className="raf-emoji-picker__button">
        <EmojiIcon />
      </div>
    </div>
  );
};
