import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { EmojiPicker } from './EmojiPicker';

describe('EmojiPicker', () => {
  it('renders correctly with default props', () => {
    const tree = renderer.create(<EmojiPicker />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-emoji-picker"
      >
        <div
          className="raf-emoji-picker__button"
          onClick={[Function]}
          role="button"
        >
          <svg
            height="20"
            viewBox="0 0 20 20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 15.498c2.33 0 4.304-1.456 5.106-3.5H4.892c.802 2.044 2.777 3.5 5.107 3.5zm-3.5-6.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm7 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-3.5 9a8 8 0 0 1-8-8 8 8 0 0 1 8-8 8 8 0 0 1 8 8 8 8 0 0 1-8 8zm-.006-18C4.467-.002 0 4.475 0 9.998s4.468 10 9.995 10c5.526 0 10.005-4.477 10.005-10s-4.479-10-10.005-10z"
              fill="#A0B2B8"
              fillRule="nonzero"
            />
          </svg>
        </div>
      </div>
    `);
  });

  it('open and closes the emoji picker correctly', () => {
    const { container, getByRole, queryByTestId } = render(<EmojiPicker />);

    expect(queryByTestId('picker-wrapper')).not.toBeInTheDocument();

    fireEvent.click(getByRole('button'));
    expect(queryByTestId('picker-wrapper')).toBeInTheDocument();

    fireEvent.mouseDown(container);
    expect(queryByTestId('picker-wrapper')).not.toBeInTheDocument();
  });
});
