// @flow
import * as React from 'react';
import moment from 'moment';
import URL from 'url-parse';
import anchorme from 'anchorme';
import _truncate from 'lodash/truncate';
import twitter from 'twitter-text';
import type { UserResponse } from './types';

import type { Renderable, RenderableButNotElement, FileLike } from './types';
// import type { UserResponse } from 'getstream';

export function humanizeTimestamp(timestamp: string | number): string {
  const time = moment.utc(timestamp); // parse time as UTC
  const now = moment();
  // Not in future humanized time
  return moment.min(time, now).from(now);
}

export const smartRender = (
  ElementOrComponentOrLiteral: Renderable,
  props?: {},
  fallback?: Renderable,
) => {
  if (ElementOrComponentOrLiteral === undefined) {
    ElementOrComponentOrLiteral = fallback;
  }
  if (React.isValidElement(ElementOrComponentOrLiteral)) {
    // Flow cast through any, to make flow believe it's a React.Element
    const element = ((ElementOrComponentOrLiteral: any): React.Element<any>);
    return element;
  }

  // Flow cast through any to remove React.Element after previous check
  const ComponentOrLiteral = ((ElementOrComponentOrLiteral: any): RenderableButNotElement);
  if (
    typeof ComponentOrLiteral === 'string' ||
    typeof ComponentOrLiteral === 'number' ||
    typeof ComponentOrLiteral === 'boolean' ||
    ComponentOrLiteral == null
  ) {
    return ComponentOrLiteral;
  }
  return <ComponentOrLiteral {...props} />;
};

export const getRetinaImage = (images: string) =>
  images
    .split('|')
    .map((item, i) => `${item} ${i + 1}x`)
    .join(', ');

export function userOrDefault(
  user: UserResponse | string | {| error: string |},
): UserResponse {
  let actor: UserResponse;
  const notFound = {
    id: '!not-found',
    created_at: '',
    updated_at: '',
    data: { name: 'Unknown', profileImage: '' },
  };
  if (typeof user === 'string' || typeof user.error === 'string') {
    actor = notFound;
  } else {
    //$FlowBug
    actor = (user: any);
  }
  return actor;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// https://stackoverflow.com/a/6860916/2570866
export function generateRandomId() {
  // prettier-ignore
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

export function dataTransferItemsHaveFiles(
  items: ?(DataTransferItem[]),
): boolean {
  if (!items || !items.length) {
    return false;
  }
  for (const item of items) {
    if (item.kind === 'file' || item.type === 'text/html') {
      return true;
    }
  }
  return false;
}
export async function dataTransferItemsToFiles(
  items: ?(DataTransferItem[]),
): Promise<FileLike[]> {
  if (!items || !items.length) {
    return [];
  }
  const fileLikes = [];
  const blobPromises = [];
  for (const item of items) {
    if (item.kind === 'file') {
      const file = item.getAsFile();
      if (file) {
        fileLikes.push(file);
      }
    }
  }
  // If there are files inside the DataTransferItem prefer those
  if (fileLikes.length) {
    return fileLikes;
  }

  // Otherwise extract images from html
  const parser = new DOMParser();
  for (const item of items) {
    if (item.type === 'text/html') {
      blobPromises.push(
        new Promise((accept) => {
          item.getAsString(async (s) => {
            const doc = parser.parseFromString(s, 'text/html');
            const imageTags = doc.getElementsByTagName('img');

            const imagePromises = [];
            for (const tag of imageTags) {
              if (!tag.src) {
                continue;
              }
              imagePromises.push(
                (async () => {
                  let res;
                  try {
                    res = await fetch(tag.src);
                  } catch (e) {
                    return;
                  }
                  const contentType =
                    res.headers.get('Content-type') ||
                    'application/octet-stream';
                  const buf = await res.arrayBuffer();
                  const blob = new Blob([buf], { type: contentType });
                  fileLikes.push(blob);
                })(),
              );
            }
            await Promise.all(imagePromises);
            accept();
          });
        }),
      );
    }
  }
  await Promise.all(blobPromises);
  return fileLikes;
}

export function inputValueFromEvent(
  event?: ?SyntheticEvent<HTMLTextAreaElement> | ?Event,
): ?string {
  if (!event) {
    return;
  }
  let target;
  if (event.currentTarget) {
    target = event.currentTarget;
  } else {
    target = event.target;
  }
  // Trick flow into believing the target maybe has a value field
  const inputTarget: { value?: string } = (target: any);
  return inputTarget.value;
}

export function sanitizeURL(url: ?string): ?string {
  if (url == null) {
    return url;
  }

  const proto = URL(url).protocol;
  // allow http, https, ftp
  // IMPORTANT: Don't allow data: protocol because of:
  // <a href="data:text/html;base64,PHNjcmlwdD5hbGVydCgneHNzJyk7PC9zY3JpcHQ+" target="_blank">here</a>
  if (proto === 'https:' || proto === 'http:' || proto === 'ftp:') {
    return url;
  }
  return undefined;
}

export const textRenderer = (
  text: string,
  parentClass: string,
  onClickMention?: (word: string) => mixed,
  onClickHashtag?: (word: string) => mixed,
) =>
  text
    .split(' ')
    .map((word, i) => {
      if (onClickMention && word[0] === '@') {
        const mention = twitter.extractMentions(word);
        if (!mention.length) return word;

        return (
          <React.Fragment key={`item-${i}`}>
            <a
              onClick={() => onClickMention && onClickMention(mention[0])}
              className={`${parentClass}__mention`}
            >
              @{mention[0]}
            </a>
            {mention[0].length !== word.length - 1 &&
              word.slice(mention[0].length + 1)}
          </React.Fragment>
        );
      } else if (onClickHashtag && word[0] === '#') {
        const hashtag = twitter.extractHashtags(word);
        if (!hashtag.length) return word;

        return (
          <React.Fragment key={`item-${i}`}>
            <a
              onClick={() => onClickHashtag && onClickHashtag(hashtag[0])}
              className={`${parentClass}__hashtag`}
            >
              #{hashtag[0]}
            </a>
            {hashtag[0].length !== word.length - 1 &&
              word.slice(hashtag[0].length + 1)}
          </React.Fragment>
        );
      }
      if (anchorme.validate.url(word) || anchorme.validate.email(word)) {
        const link = anchorme(word, { list: true });
        if (
          link[0].protocol !== 'http://' &&
          link[0].protocol !== 'https://' &&
          link[0].protocol !== 'mailto:'
        ) {
          return word;
        }
        const url = link[0].protocol + link[0].encoded;
        const urlText = _truncate(link[0].encoded, { length: 33 });
        return (
          <a
            href={url}
            className={`${parentClass}__link`}
            target="blank"
            rel="noopener"
            key={`item-${i}`}
          >
            {urlText}
          </a>
        );
      }

      return word;
    })
    .reduce((accu, elem) => (accu === null ? [elem] : [accu, ' ', elem]));
