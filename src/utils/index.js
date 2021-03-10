import URL from 'url-parse';
import Dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import minMax from 'dayjs/plugin/minMax';

Dayjs.extend(utc);
Dayjs.extend(minMax);

// import type { UserResponse } from 'getstream';

export function humanizeTimestamp(timestamp, tDateTimeParser) {
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

  const now = tDateTimeParser();
  return time.from(now);
}

export function userOrDefault(user) {
  let actor;
  const notFound = {
    id: '!not-found',
    created_at: '',
    updated_at: '',
    data: { name: 'Unknown', profileImage: '' },
  };
  if (!user || typeof user === 'string' || typeof user.error === 'string') {
    actor = notFound;
  } else {
    actor = user;
  }
  return actor;
}

// https://stackoverflow.com/a/6860916/2570866
export function generateRandomId() {
  // prettier-ignore
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

export function dataTransferItemsHaveFiles(items) {
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

function getFileLikes(items) {
  const fileLikes = [];
  for (const item of items) {
    if (item.kind === 'file') {
      const file = item.getAsFile();
      if (file) {
        fileLikes.push(file);
      }
    }
  }
  return fileLikes;
}

export async function dataTransferItemsToFiles(items) {
  if (!items || !items.length) {
    return [];
  }

  const fileLikes = getFileLikes(items);
  // If there are files inside the DataTransferItem prefer those
  if (fileLikes.length) {
    return fileLikes;
  }

  // Otherwise extract images from html
  const blobPromises = [];
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
                  const contentType = res.headers.get('Content-type') || 'application/octet-stream';
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

export function inputValueFromEvent(event) {
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
  const inputTarget = target;
  return inputTarget.value;
}

export function sanitizeURL(url) {
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

export * from './textRenderer';
export * from './smartRender';
