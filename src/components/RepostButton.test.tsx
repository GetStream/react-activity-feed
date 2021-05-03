import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';

import { RepostButton, RepostButtonProps } from './RepostButton';
import { FeedProvider } from '../context/Feed';

const testActivity: RepostButtonProps['activity'] = {
  // @ts-expect-error
  actor: {
    data: {
      name: 'Nora Ferguson',
      profileImage: 'https://randomuser.me/api/portraits/women/72.jpg',
    },
  },
  verb: 'post',
  object: 'I just missed my train 😤',
  time: new Date().toJSON(),
  reaction_counts: {
    repost: 17,
    like: 17,
    comment: 17,
  },
};

describe('RepostButton', () => {
  it('renders with default props', () => {
    const tree = renderer.create(<RepostButton activity={testActivity} />).toJSON();

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
            data-icon="retweet"
            role="img"
            style={
              Object {
                "color": "#7a8287",
              }
            }
            viewBox="0 0 640 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M629.657 343.598L528.971 444.284c-9.373 9.372-24.568 9.372-33.941 0L394.343 343.598c-9.373-9.373-9.373-24.569 0-33.941l10.823-10.823c9.562-9.562 25.133-9.34 34.419.492L480 342.118V160H292.451a24.005 24.005 0 0 1-16.971-7.029l-16-16C244.361 121.851 255.069 96 276.451 96H520c13.255 0 24 10.745 24 24v222.118l40.416-42.792c9.285-9.831 24.856-10.054 34.419-.492l10.823 10.823c9.372 9.372 9.372 24.569-.001 33.941zm-265.138 15.431A23.999 23.999 0 0 0 347.548 352H160V169.881l40.416 42.792c9.286 9.831 24.856 10.054 34.419.491l10.822-10.822c9.373-9.373 9.373-24.569 0-33.941L144.971 67.716c-9.373-9.373-24.569-9.373-33.941 0L10.343 168.402c-9.373 9.373-9.373 24.569 0 33.941l10.822 10.822c9.562 9.562 25.133 9.34 34.419-.491L96 169.881V392c0 13.255 10.745 24 24 24h243.549c21.382 0 32.09-25.851 16.971-40.971l-16.001-16z"
              fill="currentColor"
            />
          </svg>
          <p
            className="raf-reaction-icon__label"
          >
            {{ countReposts }} reposts
          </p>
        </div>
      </div>
    `);
  });

  it('checks if onPress has been called with right arguments', () => {
    const handleToggleReaction = jest.fn();
    const { getByRole, rerender } = render(
      <FeedProvider
        // @ts-expect-error
        value={{
          onToggleReaction: handleToggleReaction,
        }}
      >
        <RepostButton activity={testActivity} repostData={{}} userId="batman" />
      </FeedProvider>,
    );

    fireEvent.click(getByRole('button'));

    expect(handleToggleReaction).toHaveBeenCalledWith(
      'repost',
      testActivity,
      {},
      {
        targetFeeds: ['user:batman'],
      },
    );

    handleToggleReaction.mockClear();

    rerender(
      <FeedProvider
        // @ts-expect-error
        value={{
          onToggleReaction: handleToggleReaction,
        }}
      >
        <RepostButton activity={{ ...testActivity, object: {}, verb: 'repost' }} repostData={{}} userId="batman" />
      </FeedProvider>,
    );

    fireEvent.click(getByRole('button'));

    expect(handleToggleReaction).toHaveBeenCalledWith(
      'repost',
      {}, // activity.object
      {},
      {
        targetFeeds: ['user:batman'],
      },
    );
  });
});
