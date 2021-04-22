import React from 'react';
import renderer from 'react-test-renderer';
import moment from 'moment';

import { notificationGroup1, notificationGroup2 } from './docz';
import { Notification } from './Notification';
import { TranslationProvider } from '../Context/TranslationContext';

// @ts-expect-error
Date.now = jest.fn(() => new Date('2021-04-15T11:34:36.104Z'));

const translationProviderData = { t: String, tDateTimeParser: moment };

describe('Notification', () => {
  it('renders with test data (notificationGroup1)', () => {
    const tree = renderer
      .create(
        <TranslationProvider value={translationProviderData}>
          <Notification activityGroup={notificationGroup1} />
        </TranslationProvider>,
      )
      .toJSON();

    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-notification "
      >
        <img
          alt=""
          className="raf-avatar  raf-avatar--circle"
          src="https://randomuser.me/api/portraits/men/72.jpg"
          style={
            Object {
              "height": "30px",
              "width": "30px",
            }
          }
        />
        <div
          className="raf-notification__content"
        >
          <div
            className="raf-notification__header"
          >
            <strong>
              {{ actorName }} liked your {{ activityVerb }}
            </strong>
          </div>
          <div>
            <small>
              2 days ago
            </small>
          </div>
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
                  src="https://stream-cloud-uploads.imgix.net/images/41814/a5db2d18-1803-4300-906f-579af270edf1.3356358479_a0e3ee8a05_b.jpg?s=65db066cf45ee7895529725a8d478c14"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className="raf-notification__extra"
        />
      </div>
    `);
  });

  it('renders with test data (notificationGroup2)', () => {
    const tree = renderer
      .create(
        <TranslationProvider value={translationProviderData}>
          <Notification
            activityGroup={notificationGroup2}
            onClickUser={console.log}
            onClickNotification={console.log}
          />
        </TranslationProvider>,
      )
      .toJSON();

    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-notification "
        onClick={[Function]}
      >
        <img
          alt=""
          className="raf-avatar  raf-avatar--circle"
          onClick={[Function]}
          src="https://randomuser.me/api/portraits/women/72.jpg"
          style={
            Object {
              "height": "30px",
              "width": "30px",
            }
          }
        />
        <div
          className="raf-notification__content"
        >
          <div
            className="raf-notification__header"
          >
            <strong>
              {{ actorName }} and {{ countOtherActors }} others followed you
            </strong>
          </div>
          <div>
            <small>
              4 days ago
            </small>
          </div>
        </div>
        <div
          className="raf-notification__extra"
        >
          <div
            className="raf-avatar-group"
          >
            <div
              className="raf-avatar-group__avatar"
            >
              <img
                alt=""
                className="raf-avatar  raf-avatar--circle"
                onClick={[Function]}
                src="https://randomuser.me/api/portraits/men/72.jpg"
                style={
                  Object {
                    "height": "30px",
                    "width": "30px",
                  }
                }
              />
            </div>
            <div
              className="raf-avatar-group__avatar"
            >
              <img
                alt=""
                className="raf-avatar  raf-avatar--circle"
                onClick={[Function]}
                src="https://randomuser.me/api/portraits/women/7.jpg"
                style={
                  Object {
                    "height": "30px",
                    "width": "30px",
                  }
                }
              />
            </div>
          </div>
        </div>
      </div>
    `);
  });
});
