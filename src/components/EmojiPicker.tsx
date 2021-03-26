import React, { useCallback, useRef, useState } from 'react';
import { EmojiData, Picker } from 'emoji-mart';

import { useTranslationContext } from '../Context';
import { useOnClickOutside } from '../hooks/useOnClickOutside';

export type EmojiPickerType = {
  onSelect?: (emoji: EmojiData) => void;
};

export const EmojiPicker = ({ onSelect }: EmojiPickerType) => {
  const { t } = useTranslationContext();
  const [open, setOpen] = useState(false);
  const emojiPicker = useRef<HTMLDivElement | null>(null);

  const closeMenu = useCallback(() => setOpen(false), []);
  useOnClickOutside(emojiPicker, closeMenu);

  return (
    <div className="raf-emoji-picker">
      {open && (
        <div data-testid="picker-wrapper" className="raf-emoji-picker__container" ref={emojiPicker}>
          <Picker emoji="point_up" title={t('Pick your emoji')} onSelect={onSelect} />
        </div>
      )}
      <div role="button" onClick={() => setOpen(true)} className="raf-emoji-picker__button">
        <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 15.498c2.33 0 4.304-1.456 5.106-3.5H4.892c.802 2.044 2.777 3.5 5.107 3.5zm-3.5-6.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm7 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-3.5 9a8 8 0 0 1-8-8 8 8 0 0 1 8-8 8 8 0 0 1 8 8 8 8 0 0 1-8 8zm-.006-18C4.467-.002 0 4.475 0 9.998s4.468 10 9.995 10c5.526 0 10.005-4.477 10.005-10s-4.479-10-10.005-10z"
            fill="#A0B2B8"
            fillRule="nonzero"
          />
        </svg>
      </div>
    </div>
  );
};
