import React from 'react';
import { render } from '@testing-library/react';
import { StatusUpdateForm } from './StatusUpdateForm';
import { I18n } from 'emoji-mart';
import { EmojiPicker } from '../EmojiPicker';

jest.mock('../EmojiPicker', () => {
  return {
    ...jest.requireActual('../EmojiPicker'),
    EmojiPicker: jest.fn(() => null),
  };
});

describe('StatusUpdateForm', () => {
  it('passes i18n prop to EmojiPicker', () => {
    const emojiI18n: Partial<I18n> = {
      search: 'Custom Search String',
      // @ts-ignore
      categories: { recent: 'Recent Emojis' },
    };

    render(<StatusUpdateForm emojiI18n={emojiI18n} />);
    expect(EmojiPicker).toHaveBeenCalledWith(expect.objectContaining({ i18n: emojiI18n }), {});
  });
});
