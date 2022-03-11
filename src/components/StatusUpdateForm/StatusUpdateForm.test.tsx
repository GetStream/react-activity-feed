import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { StatusUpdateForm } from './StatusUpdateForm';
import { I18n } from 'emoji-mart';
import { EmojiPicker } from '../EmojiPicker';

const customTextareaPlaceholder = 'Custom placeholder';
const Textarea = jest.fn(() => <textarea placeholder={customTextareaPlaceholder} />);

jest.mock('../EmojiPicker', () => {
  return {
    ...jest.requireActual('../EmojiPicker'),
    EmojiPicker: jest.fn(() => null),
  };
});

describe('StatusUpdateForm', () => {
  beforeEach(jest.clearAllMocks);

  it('passes i18n prop to EmojiPicker', () => {
    const emojiI18n: Partial<I18n> = {
      search: 'Custom Search String',
      // @ts-ignore
      categories: { recent: 'Recent Emojis' },
    };

    render(<StatusUpdateForm emojiI18n={emojiI18n} />);
    expect(EmojiPicker).toHaveBeenCalledWith(expect.objectContaining({ i18n: emojiI18n }), {});
  });

  it('renders default Textarea', () => {
    const { getByRole } = render(<StatusUpdateForm />);
    expect(getByRole('textbox')).toHaveProperty('placeholder', 'Type your post...');
  });

  it('renders custom Textarea', () => {
    const { getByRole } = render(<StatusUpdateForm Textarea={Textarea} />);
    expect(getByRole('textbox')).toHaveProperty('placeholder', customTextareaPlaceholder);
  });
});
