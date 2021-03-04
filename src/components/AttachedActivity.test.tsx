import React from 'react';
import renderer from 'react-test-renderer';

import { AttachedActivity } from './AttachedActivity';

const attachments = {
  images: ['https://getstream.imgix.net/images/random_svg/A.png'],
};

const activity = {
  verb: 'post',
  object: 'Random string',
  actor: {
    data: {
      name: 'Random user',
    },
  },
};

describe('AttachedActivity', () => {
  it('renders without attachments', () => {
    const tree = renderer.create(<AttachedActivity activity={activity} />);

    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-attached-activity"
      >
        <p
          className="raf-attached-activity__author"
        >
          <strong>
            Random user
          </strong>
        </p>
        <p
          className="raf-attached-activity__content"
        >
          Random string
        </p>
      </div>
    `);
  });

  it('renders with attachments (images)', () => {
    const tree = renderer.create(<AttachedActivity activity={{ ...activity, attachments }} />);

    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-attached-activity"
      >
        <div
          className="raf-attached-activity__images"
        >
          <div
            className="rfu-thumbnail__wrapper"
            style={
              Object {
                "height": 50,
                "width": 50,
              }
            }
          >
            <div
              className="rfu-thumbnail__overlay"
            />
            <img
              alt=""
              className="rfu-thumbnail__image"
              src="https://getstream.imgix.net/images/random_svg/A.png"
            />
          </div>
        </div>
      </div>
    `);
  });
});
