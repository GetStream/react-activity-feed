import React from 'react';
import renderer from 'react-test-renderer';

import moment from 'moment';
import { CommentItem, CommentItemProps } from './CommentItem';

import { TranslationProvider } from '../context/TranslationContext';

// @ts-expect-error
Date.now = jest.fn(() => new Date('2021-04-15T11:34:36.104Z'));

const translationProviderData = { t: (v: string) => v, tDateTimeParser: moment };

const testUserData = {
  data: {
    name: 'Rosemary',
    subtitle: 'likes playing fresbee in the park',
    profileImage: 'https://randomuser.me/api/portraits/women/20.jpg',
  },
  created_at: '',
  updated_at: '',
  id: '',
};

const testData: CommentItemProps['comment'] = {
  user: undefined,
  created_at: '2021-04-13T07:40:37.975Z',
  data: {
    text: 'Snowboarding is awesome! #snowboarding @mark',
  },
  kind: 'comment',
  id: '',
  activity_id: '',
  parent: '',
  updated_at: '',
  user_id: '',
  children_counts: {},
  latest_children: {},
};

describe('CommentItem', () => {
  it('renders with default props', () => {
    const tree = renderer
      .create(
        <TranslationProvider value={translationProviderData}>
          <CommentItem comment={testData} />
        </TranslationProvider>,
      )
      .toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-comment-item"
      >
        <div
          className="raf-flex"
          style={
            Object {
              "alignItems": "flex-start",
              "flexDirection": "row",
              "flexWrap": "nowrap",
              "justifyContent": undefined,
              "justifySelf": undefined,
              "padding": "8px 0",
            }
          }
        />
        <div
          className="raf-flex"
          style={
            Object {
              "alignItems": undefined,
              "flex": 1,
              "flexDirection": "column",
              "flexWrap": "nowrap",
              "justifyContent": undefined,
              "justifySelf": undefined,
              "margin": "0 8px",
            }
          }
        >
          <div
            className="raf-comment-item__content"
          >
            <time
              dateTime="2021-04-13T07:40:37.975Z"
              title="2021-04-13T07:40:37.975Z"
            >
              <small>
                2 days ago
              </small>
            </time>
            <p>
              <span
                className="raf-comment-item__author"
              />
               
              Snowboarding
               
              is
               
              awesome!
               
              #snowboarding
               
              @mark
            </p>
          </div>
        </div>
      </div>
    `);
  });

  it('renders with user specified', () => {
    const tree = renderer
      .create(
        <TranslationProvider value={translationProviderData}>
          <CommentItem comment={{ ...testData, user: testUserData }} />
        </TranslationProvider>,
      )
      .toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-comment-item"
      >
        <div
          className="raf-flex"
          style={
            Object {
              "alignItems": "flex-start",
              "flexDirection": "row",
              "flexWrap": "nowrap",
              "justifyContent": undefined,
              "justifySelf": undefined,
              "padding": "8px 0",
            }
          }
        >
          <img
            alt=""
            className="raf-avatar raf-avatar--circle"
            src="https://randomuser.me/api/portraits/women/20.jpg"
            style={
              Object {
                "height": "25px",
                "width": "25px",
              }
            }
          />
        </div>
        <div
          className="raf-flex"
          style={
            Object {
              "alignItems": undefined,
              "flex": 1,
              "flexDirection": "column",
              "flexWrap": "nowrap",
              "justifyContent": undefined,
              "justifySelf": undefined,
              "margin": "0 8px",
            }
          }
        >
          <div
            className="raf-comment-item__content"
          >
            <time
              dateTime="2021-04-13T07:40:37.975Z"
              title="2021-04-13T07:40:37.975Z"
            >
              <small>
                2 days ago
              </small>
            </time>
            <p>
              <span
                className="raf-comment-item__author"
              >
                Rosemary
              </span>
               
              Snowboarding
               
              is
               
              awesome!
               
              #snowboarding
               
              @mark
            </p>
          </div>
        </div>
      </div>
    `);
  });

  it('renders with hashtags and mentions', () => {
    const tree = renderer
      .create(
        <TranslationProvider value={translationProviderData}>
          <CommentItem onClickHashtag={console.log} onClickMention={console.log} comment={testData} />
        </TranslationProvider>,
      )
      .toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-comment-item"
      >
        <div
          className="raf-flex"
          style={
            Object {
              "alignItems": "flex-start",
              "flexDirection": "row",
              "flexWrap": "nowrap",
              "justifyContent": undefined,
              "justifySelf": undefined,
              "padding": "8px 0",
            }
          }
        />
        <div
          className="raf-flex"
          style={
            Object {
              "alignItems": undefined,
              "flex": 1,
              "flexDirection": "column",
              "flexWrap": "nowrap",
              "justifyContent": undefined,
              "justifySelf": undefined,
              "margin": "0 8px",
            }
          }
        >
          <div
            className="raf-comment-item__content"
          >
            <time
              dateTime="2021-04-13T07:40:37.975Z"
              title="2021-04-13T07:40:37.975Z"
            >
              <small>
                2 days ago
              </small>
            </time>
            <p>
              <span
                className="raf-comment-item__author"
              />
               
              Snowboarding
               
              is
               
              awesome!
               
              <a
                className="raf-comment-item__hashtag"
                onClick={[Function]}
              >
                #snowboarding
              </a>
               
              <a
                className="raf-comment-item__mention"
                onClick={[Function]}
              >
                @mark
              </a>
            </p>
          </div>
        </div>
      </div>
    `);
  });
});
