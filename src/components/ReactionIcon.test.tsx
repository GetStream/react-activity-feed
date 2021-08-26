import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';

import { ReactionIcon, ReactionIconProps } from './ReactionIcon';
import { ThumbsUpIcon } from './Icons';

const testLabels: ReactionIconProps = {
  labelSingle: 'thumb',
  labelPlural: 'thumbs',
};

describe('ReactionIcon', () => {
  it('renders with default props', () => {
    const tree = renderer.create(<ReactionIcon />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-reaction-icon"
        role="button"
      >
        <p
          className="raf-reaction-icon__label"
        />
      </div>
    `);
  });

  it('renders with icon as JSX.Element', () => {
    const tree = renderer.create(<ReactionIcon icon={<ThumbsUpIcon />} />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-reaction-icon"
        role="button"
      >
        <svg
          className="raf-reaction-icon__image"
          data-icon="thumbs-up"
          role="img"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z"
            fill="currentColor"
          />
        </svg>
        <p
          className="raf-reaction-icon__label"
        />
      </div>
    `);
  });

  it('renders with icon as string (URL)', () => {
    const tree = renderer
      .create(<ReactionIcon icon="https://pics.freeicons.io/uploads/icons/png/4781616661579237635-24.png" />)
      .toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-reaction-icon"
        role="button"
      >
        <img
          alt=""
          className="raf-reaction-icon__image"
          src="https://pics.freeicons.io/uploads/icons/png/4781616661579237635-24.png"
        />
        <p
          className="raf-reaction-icon__label"
        />
      </div>
    `);
  });

  it('renders with specified labels (singular)', () => {
    const tree = renderer.create(<ReactionIcon counts={{ like: 1 }} kind="like" {...testLabels} />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-reaction-icon"
        role="button"
      >
        <p
          className="raf-reaction-icon__label"
        >
          1 thumb
        </p>
      </div>
    `);
  });

  it('renders with specified labels (plural)', () => {
    const tree = renderer.create(<ReactionIcon counts={{ like: 3 }} kind="like" {...testLabels} />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-reaction-icon"
        role="button"
      >
        <p
          className="raf-reaction-icon__label"
        >
          3 thumbs
        </p>
      </div>
    `);
  });

  it('renders with labels unspecified (singular)', () => {
    const tree = renderer.create(<ReactionIcon counts={{ like: 1 }} kind="like" />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-reaction-icon"
        role="button"
      >
        <p
          className="raf-reaction-icon__label"
        >
          1 like
        </p>
      </div>
    `);
  });

  it('renders with labels unspecified (plural)', () => {
    const tree = renderer.create(<ReactionIcon counts={{ like: 3 }} kind="like" />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-reaction-icon"
        role="button"
      >
        <p
          className="raf-reaction-icon__label"
        >
          {{ countLikes }} likes
        </p>
      </div>
    `);
  });

  it('checks if onPress callback has been called', () => {
    const onClick = jest.fn();

    const { getByRole } = render(<ReactionIcon onPress={onClick} />);

    fireEvent.click(getByRole('button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
