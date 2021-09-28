import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react';

import { Dropdown } from './Dropdown';

describe('Dropdown', () => {
  it('renders with default props', () => {
    const tree = renderer.create(<Dropdown />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-dropdown"
      >
        <div
          className="rfu-icon-button"
          onClick={[Function]}
          role="button"
        >
          <svg
            className="raf-dropdown__button"
            height="8"
            viewBox="0 0 12 8"
            width="12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.41 0L6 4.77 10.59 0 12 1.469l-6 6.25-6-6.25z"
              fill="#A0B2B8"
              fillRule="evenodd"
            />
          </svg>
        </div>
      </div>
    `);
  });

  it('renders with dropdown box after click', () => {
    const { getByRole, container } = render(
      <Dropdown>
        <span>Hello!</span>
      </Dropdown>,
    );

    fireEvent.click(getByRole('button'));

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="raf-dropdown"
      >
        <div
          class="rfu-icon-button"
          role="button"
        >
          <svg
            class="raf-dropdown__button"
            height="8"
            viewBox="0 0 12 8"
            width="12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.41 0L6 4.77 10.59 0 12 1.469l-6 6.25-6-6.25z"
              fill="#A0B2B8"
              fill-rule="evenodd"
            />
          </svg>
        </div>
        <div
          class="raf-dropdown__box"
        >
          <span>
            Hello!
          </span>
        </div>
      </div>
    `);

    fireEvent.mouseDown(container);

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="raf-dropdown"
      >
        <div
          class="rfu-icon-button"
          role="button"
        >
          <svg
            class="raf-dropdown__button"
            height="8"
            viewBox="0 0 12 8"
            width="12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.41 0L6 4.77 10.59 0 12 1.469l-6 6.25-6-6.25z"
              fill="#A0B2B8"
              fill-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    `);
  });
});
