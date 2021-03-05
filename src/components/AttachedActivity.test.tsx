import React from 'react';
import renderer from 'react-test-renderer';

import { AttachedActivity } from './AttachedActivity';

const attachments = {
  images: ['https://getstream.imgix.net/images/random_svg/A.png'],
};

const actor = {
  data: {
    name: 'Random user',
  },
};

const activity = {
  verb: 'post',
  object: 'Random string',
};

describe('AttachedActivity', () => {
  it('renders without attachments and with actor', () => {
    const tree = renderer.create(<AttachedActivity activity={{ ...activity, actor }} />);

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

  it('renders with attachments and without actor', () => {
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

  it('renders without attachments and without actor', () => {
    const tree = renderer.create(<AttachedActivity activity={activity} />);

    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-attached-activity"
      >
        <p
          className="raf-attached-activity__author"
        >
          <strong>
            Unknown
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
});
