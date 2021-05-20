import React from 'react';
import { render } from '@testing-library/react';

import { Activity, ActivityProps } from './Activity';

const testData: ActivityProps = {
  activity: {
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
  },
  icon: 'image.svg',
  onClickUser: console.log,
  onClickHashtag: console.log,
  onClickMention: console.log,
  userId: 'batman',
  feedGroup: 'user',
};

describe('Activity', () => {
  const [Header, HeaderRight, Footer, Content, Repost, Card] = Array.from({ length: 6 }).map(() => jest.fn(() => null));

  it('runs render functions with proper arguments', () => {
    render(<Activity {...testData} {...{ Header, HeaderRight, Footer, Content, Repost, Card }} />);

    expect(Footer).toHaveBeenCalledWith(
      { userId: testData.userId, feedGroup: testData.feedGroup, activity: testData.activity },
      {},
    );
    expect(Header).toHaveBeenCalledWith(
      { icon: testData.icon, HeaderRight, onClickUser: testData.onClickUser, activity: testData.activity },
      {},
    );
    expect(Content).toHaveBeenCalledWith(
      {
        ...testData,
        HeaderRight,
        Content,
        Footer,
        Header,
        Repost,
        Card,
      },
      {},
    );
  });
});
