import React, { useRef, useState } from 'react';
import { EmojiData, Picker } from 'emoji-mart';

import { useTranslationContext } from '../context';
import { useOnClickOutside } from '../hooks/useOnClickOutside';
import { EmojiIcon } from './Icons';

export type EmojiPickerType = {
  onSelect?: (emoji: EmojiData) => void;
};

export const EmojiPicker = ({ onSelect }: EmojiPickerType) => {
  const { t } = useTranslationContext();
  const [open, setOpen] = useState(false);
  const emojiPicker = useRef<HTMLDivElement>(null);

  useOnClickOutside(emojiPicker, () => setOpen(false), open);

  return (
    <div className="raf-emoji-picker">
      {open && (
        <div data-testid="picker-wrapper" className="raf-emoji-picker__container" ref={emojiPicker}>
          <Picker emoji="point_up" title={t('Pick your emoji')} onSelect={onSelect} />
        </div>
      )}
      <div role="button" onClick={() => setOpen(true)} className="raf-emoji-picker__button">
        <EmojiIcon />
      </div>
    </div>
  );
};
