import React from 'react';
import { FileIcon } from 'react-file-utils';
import { EnrichedActivity, UR } from 'getstream';

import { DefaultAT, DefaultUT } from '../Context/StreamApp';
import { textRenderer, smartRender, sanitizeURL } from '../utils';
import { Audio } from './Audio';
import { Video } from './Video';
import { Card } from './Card';
import { Gallery } from './Gallery';
import { ActivityProps } from './Activity';

export type ActivityContentProps<
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR
> = ActivityProps<UT, AT, CT, RT, CRT>;

export const ActivityContent = <
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR
>({
  activity,
  Repost,
  ...props
}: ActivityContentProps<UT, AT, CT, RT, CRT>) => {
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
          <p>{textRenderer(text, 'raf-activity', props.onClickMention, props.onClickHashtag)}</p>
        </div>
      )}

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

      {verb === 'repost' &&
        typeof object === 'object' &&
        smartRender(Repost, {
          ...props,
          activity: object as EnrichedActivity<UT, AT, CT, RT, CRT>,
        })}
    </div>
  );
};
