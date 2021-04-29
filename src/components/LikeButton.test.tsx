import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';

import { LikeButton, LikeButtonProps } from './LikeButton';
import { FeedProvider } from '../context';

const testActivityData: LikeButtonProps['activity'] = {
  id: '',
  reaction_counts: {
    like: 12,
  },
  own_reactions: {},
  actor: '',
  object: 'string',
  verb: '',
  foreign_id: '',
  time: '',
};

const testReactionData: LikeButtonProps['reaction'] = {
  activity_id: '',
  user_id: '',
  user: {
    id: '',
    created_at: '',
    updated_at: '',
    data: {
      profileImage: '',
      name: '',
    },
  },
  data: {},
  id: '',
  kind: 'like',
  created_at: '',
  parent: '',
  updated_at: '',
  children_counts: {
    like: 10,
  },
  latest_children: {},
};

describe('LikeButton', () => {
  it('renders with required properties', () => {
    const tree = renderer.create(<LikeButton activity={testActivityData} />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-reaction-toggle-icon"
      >
        <div
          className="raf-reaction-icon"
          onClick={[Function]}
          role="button"
        >
          <svg
            className="raf-reaction-icon__image"
            data-icon="thumbs-up"
            role="img"
            style={
              Object {
                "color": "#7a8287",
              }
            }
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
          >
            12 likes
          </p>
        </div>
      </div>
    `);
  });

  it('renders with reaction and onToggleChildReaction specified', () => {
    const tree = renderer.create(<LikeButton reaction={testReactionData} />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-reaction-toggle-icon"
      >
        <div
          className="raf-reaction-icon"
          onClick={[Function]}
          role="button"
        >
          <svg
            className="raf-reaction-icon__image"
            data-icon="thumbs-up"
            role="img"
            style={
              Object {
                "color": "#7a8287",
              }
            }
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
          >
            10 likes
          </p>
        </div>
      </div>
    `);
  });

  it('checks if onToggleReaction callback has been called', () => {
    const onToggleReaction = jest.fn();

    const { getByRole } = render(
      // @ts-expect-error
      <FeedProvider value={{ onToggleReaction }}>
        <LikeButton activity={testActivityData} />
      </FeedProvider>,
    );

    fireEvent.click(getByRole('button'));

    expect(onToggleReaction).toHaveBeenCalledTimes(1);
  });

  it('checks if onToggleChildReaction callback has been called', () => {
    const onToggleChildReaction = jest.fn();

    const { getByRole } = render(
      // @ts-expect-error
      <FeedProvider value={{ onToggleChildReaction }}>
        <LikeButton reaction={testReactionData} />
      </FeedProvider>,
    );

    fireEvent.click(getByRole('button'));

    expect(onToggleChildReaction).toHaveBeenCalledTimes(1);
  });
});
