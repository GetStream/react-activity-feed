import React from 'react';
import { FileIcon } from 'react-file-utils';

import { DefaultAT, DefaultUT } from '../Context/StreamApp';
import { textRenderer, sanitizeURL } from '../utils';
import { Audio } from './Audio';
import { Video } from './Video';
import { Card } from './Card';
import { Gallery } from './Gallery';
import { ActivityProps } from './Activity';

export type ActivityContentProps<UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT> = Pick<
  ActivityProps<UT, AT>,
  'activity' | 'onClickMention' | 'onClickHashtag'
>;

export const ActivityContent = <UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT>({
  activity,
  onClickHashtag,
  onClickMention,
}: ActivityContentProps<UT, AT>) => {
  const {
    object,
    text = (typeof object === 'string' ? object : '').trim(),
    attachments: { og, images = [], files = [] } = {},
    verb,
    image,
  } = activity;

  return (
    <div className="raf-activity__content">
      {text && (
        <div style={{ padding: '8px 16px' }}>
          <p>{textRenderer(text, 'raf-activity', onClickMention, onClickHashtag)}</p>
        </div>
      )}

      {verb === 'repost' && typeof object === 'object' && <Card {...object.data} />}

      {og && (
        <div style={{ padding: '8px 16px' }}>
          {og.videos ? <Video og={og} /> : og.audios ? <Audio og={og} /> : <Card {...og} />}
        </div>
      )}

      {typeof image === 'string' && (
        <div style={{ padding: '8px 0' }}>
          <Gallery images={[image]} />
        </div>
      )}

      {!!images.length && (
        <div style={{ padding: '8px 0' }}>
          <Gallery images={images} />
        </div>
      )}

      {!!files.length && (
        <ol className="raf-activity__attachments">
          {files.map(({ name, url, mimeType }, i) => (
            <a href={sanitizeURL(url)} download key={i}>
              <li className="raf-activity__file">
                <FileIcon mimeType={mimeType} filename={name} /> {name}
              </li>
            </a>
          ))}
        </ol>
      )}
    </div>
  );
};
