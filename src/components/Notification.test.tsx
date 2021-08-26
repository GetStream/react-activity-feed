import React from 'react';
import renderer from 'react-test-renderer';
import moment from 'moment';

import { notificationGroup1, notificationGroup2 } from './docz';
import { Notification } from './Notification';
import { TranslationProvider } from '../context/TranslationContext';

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
                  src="data:image/png;base64,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"
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
