import React, { useMemo, MouseEvent } from 'react';
import URL from 'url-parse';
import Dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import minMax from 'dayjs/plugin/minMax';
import relativeTime from 'dayjs/plugin/relativeTime';
import { EnrichedUser, UR } from 'getstream';
import { TDateTimeParser } from '../i18n/Streami18n';
import { DefaultUT } from '../context/StreamApp';

Dayjs.extend(utc);
Dayjs.extend(minMax);
Dayjs.extend(relativeTime);

export function humanizeTimestamp(timestamp: string | number | Date, tDateTimeParser: TDateTimeParser) {
  let time;
  // Following calculation is based on assumption that tDateTimeParser()
  // either returns momentjs or dayjs object.

  // When timestamp doesn't have z at the end, we are supposed to take it as UTC time.
  // Ideally we need to adhere to RFC3339. Unfortunately this needs to be fixed on backend.
  if (typeof timestamp === 'string' && timestamp[timestamp.length - 1].toLowerCase() === 'z') {
    time = tDateTimeParser(timestamp);
  } else {
    time = tDateTimeParser(timestamp).add(Dayjs(timestamp).utcOffset(), 'minute'); // parse time as UTC
  }

  return time.fromNow();
}

type ErrorUser = { error: string };
function isErrorUser(user: unknown | ErrorUser): user is ErrorUser {
  return !!user && typeof (user as ErrorUser).error === 'string';
}

export type UserOrDefaultReturnType<T extends UR = UR> =
  | EnrichedUser<T>
  | (EnrichedUser<{ name: 'Unknown'; profileImage: '' }> & { id: '!not-found' });

export function userOrDefault<T extends UR = UR>(
  user?: EnrichedUser<T> | UserOrDefaultReturnType<T> | string | { error: string } | null,
): UserOrDefaultReturnType<T> {
  if (!user || typeof user === 'string' || isErrorUser(user))
    return {
      id: '!not-found',
      created_at: '',
      updated_at: '',
      data: { name: 'Unknown', profileImage: '' },
    };

  return user;
}

// https://stackoverflow.com/a/6860916/2570866
export function generateRandomId() {
  // prettier-ignore
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

export function dataTransferItemsHaveFiles(items?: DataTransferItemList) {
  if (!items || !items.length) return false;

  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];
    if (item.kind === 'file' || item.type === 'text/html') return true;
  }

  return false;
}

function getFileLikes(items: DataTransferItemList) {
  const fileLikes: Array<Blob | File> = [];
  for (let i = 0; i < items.length; i += 1) {
    const item = items.item(i);
    if (item.kind === 'file') {
      const file = item.getAsFile();
      if (file) fileLikes.push(file);
    }
  }
  return fileLikes;
}

export async function dataTransferItemsToFiles(items?: DataTransferItemList) {
  if (!items || !items.length) return [];

  const fileLikes = getFileLikes(items);
  // If there are files inside the DataTransferItem prefer those
  if (fileLikes.length) return fileLikes;

  // Otherwise extract images from html
  const blobPromises = [];
  const parser = new DOMParser();
  for (let i = 0; i < items.length; i += 1) {
    const item = items.item(i);
    if (item.type === 'text/html') {
      blobPromises.push(
        new Promise((accept) => {
          item.getAsString(async (s) => {
            const doc = parser.parseFromString(s, 'text/html');
            const imageTags = doc.getElementsByTagName('img');

            const imagePromises = [];
            for (let j = 0; j < imageTags.length; j++) {
              const tag = imageTags[j];
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
                  const contentType = res.headers.get('Content-type') || 'application/octet-stream';
                  const buf = await res.arrayBuffer();
                  const blob = new Blob([buf], { type: contentType });
                  fileLikes.push(blob);
                })(),
              );
            }
            await Promise.all(imagePromises);
            accept(true);
          });
        }),
      );
    }
  }
  await Promise.all(blobPromises);
  return fileLikes;
}

export function inputValueFromEvent<T extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement>(
  event?: React.SyntheticEvent<T>,
) {
  const target = (event?.currentTarget || event?.target) as T;
  return target?.value;
}

export function sanitizeURL(url?: string) {
  if (!url) return url;

  const proto = URL(url).protocol;
  // allow http, https, ftp
  // IMPORTANT: Don't allow data: protocol because of:
  // <a href="data:text/html;base64,PHNjcmlwdD5hbGVydCgneHNzJyk7PC9zY3JpcHQ+" target="_blank">here</a>
  if (proto === 'https:' || proto === 'http:' || proto === 'ftp:') {
    return url;
  }
  return undefined;
}

/**
 *
 * @param {string | undefined} url
 */
export const trimURL = (url?: string) =>
  url
    ?.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '')
    .split('/')
    .shift();

export type OnClickUserHandler<UT extends DefaultUT = DefaultUT> = (user: UserOrDefaultReturnType<UT>) => void;
export const useOnClickUser = <
  UT extends DefaultUT = DefaultUT,
  E extends HTMLElement | SVGGElement = HTMLImageElement | SVGSVGElement
>(
  onClickUser?: OnClickUserHandler<UT>,
) =>
  useMemo(
    () =>
      onClickUser
        ? (user?: EnrichedUser<UT> | UserOrDefaultReturnType<UT>) => (event: MouseEvent<E>) => {
            event.stopPropagation();
            onClickUser(userOrDefault<UT>(user));
          }
        : undefined,
    [onClickUser],
  );

export * from './textRenderer';
export * from './smartRender';
