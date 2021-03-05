import React, { useMemo } from 'react';
import { userOrDefault } from '../utils';

import { EnrichedActivity, OGAPIResponse } from 'getstream';

import { Thumbnail } from 'react-file-utils';

export type FileData = {
  mimeType: string;
  name: string;
  url: string;
};

export type Attachments = {
  files?: FileData[];
  images?: string[];
  og?: OGAPIResponse;
};

export type CustomActivityData = {
  attachments?: Attachments;
  image?: string;
  link?: boolean;
  text?: string;
};

export type UserData = {
  name?: string;
  profileImage?: string;
};

export type AttachedActivityProps = {
  activity: EnrichedActivity<UserData, CustomActivityData>;
};

export const AttachedActivity = ({ activity: { object, verb, attachments, actor } }: AttachedActivityProps) => {
  const images = attachments?.images ?? [];
  const user = useMemo(() => userOrDefault(actor), [actor]);

  if (verb === 'repost' || verb === 'post' || verb === 'comment') {
    return (
      <div className="raf-attached-activity">
        {images.length ? (
          <div className="raf-attached-activity__images">
            {images.slice(0, 5).map((image, i) => (
              <Thumbnail image={image} size={50} key={`image-${i}`} />
            ))}
          </div>
        ) : (
          <React.Fragment>
            <p className="raf-attached-activity__author">
              <strong>{user.data.name}</strong>
            </p>
            <p className="raf-attached-activity__content">{object as string}</p>
          </React.Fragment>
        )}
      </div>
    );
  }

  return null;
};
