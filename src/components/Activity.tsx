import React from 'react';
import { FileIcon } from 'react-file-utils';
import { EnrichedActivity, UR } from 'getstream';

import { UserBar } from './UserBar';
import { Card } from './Card';
import { Audio } from './Audio';
import { Video } from './Video';
import { Gallery } from './Gallery';
import {
  smartRender,
  sanitizeURL,
  userOrDefault,
  textRenderer,
  humanizeTimestamp,
  ElementOrComponentOrLiteralType,
  UserOrDefaultReturnType,
} from '../utils';
import { useTranslationContext } from '../Context';
import { DefaultAT, DefaultUT } from '../Context/StreamApp';

export type ActivityProps<UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT> = {
  activity: EnrichedActivity<UT, AT>;
  icon?: string;
  /** Handler for any routing you may do on clicks on Hashtags */
  onClickHashtag?: (word: string) => void;
  /** Handler for any routing you may do on clicks on Mentions */
  onClickMention?: (word: string) => void;
  onClickUser?: (user: UserOrDefaultReturnType<UT>) => void;
  sub?: string;
} & Record<'Header' | 'HeaderRight' | 'Footer' | 'Content', ElementOrComponentOrLiteralType>;

type DefaultActivityHeaderProps<UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT> = Pick<
  ActivityProps<UT, AT>,
  'activity' | 'HeaderRight' | 'icon' | 'onClickUser'
>;
type DefaultActivityContentProps<UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT> = Pick<
  ActivityProps<UT, AT>,
  'activity' | 'onClickMention' | 'onClickHashtag'
>;

const DefaultActivityHeader = <UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT>({
  activity,
  HeaderRight,
  icon,
  onClickUser,
}: DefaultActivityHeaderProps<UT, AT>) => {
  const { tDateTimeParser } = useTranslationContext();

  const actor = userOrDefault<UT>(activity.actor);

  return (
    <div style={{ padding: '8px 16px' }}>
      <UserBar
        username={actor.data.name}
        avatar={actor.data.profileImage}
        onClickUser={onClickUser ? () => onClickUser(actor) : undefined}
        subtitle={HeaderRight ? humanizeTimestamp(activity.time, tDateTimeParser) : undefined}
        timestamp={activity.time}
        icon={icon}
        Right={HeaderRight}
      />
    </div>
  );
};

const DefaultAtivityContent = <UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT>({
  activity,
  onClickHashtag,
  onClickMention,
}: DefaultActivityContentProps<UT, AT>) => {
  const { object, text = (typeof object === 'string' ? object : '').trim(), attachments = {}, verb, image } = activity;

  return (
    <div className="raf-activity__content">
      {text && (
        <div style={{ padding: '8px 16px' }}>
          <p>{textRenderer(text, 'raf-activity', onClickMention, onClickHashtag)}</p>
        </div>
      )}

      {verb === 'repost' && 'data' in object && <Card {...(object.data as UR)} />}

      {attachments.og && Object.keys(attachments.og).length && (
        <div style={{ padding: '8px 16px' }}>
          {attachments.og.videos ? (
            <Video og={attachments.og} />
          ) : attachments.og.audios ? (
            <Audio og={attachments.og} />
          ) : (
            <Card {...attachments.og} />
          )}
        </div>
      )}

      {typeof image === 'string' && (
        <div style={{ padding: '8px 0' }}>
          <Gallery
            images={[image]}
            // resizeMethod="resize"
          />
        </div>
      )}

      {attachments.images?.length && (
        <div style={{ padding: '8px 0' }}>
          <Gallery images={attachments.images} />
        </div>
      )}

      {attachments.files?.length && (
        <ol className="raf-activity__attachments">
          {attachments.files.map(({ name, url, mimeType }, i) => (
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

export const Activity = <UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT>({
  Header,
  HeaderRight,
  Content,
  Footer,
  activity,
  icon,
  onClickHashtag,
  onClickMention,
  onClickUser,
}: ActivityProps<UT, AT>) => {
  return (
    <div className="raf-activity">
      {smartRender(
        Header,
        {},
        <DefaultActivityHeader activity={activity} HeaderRight={HeaderRight} icon={icon} onClickUser={onClickUser} />,
      )}
      {smartRender(
        Content,
        {},
        <DefaultAtivityContent activity={activity} onClickHashtag={onClickHashtag} onClickMention={onClickMention} />,
      )}
      {smartRender(Footer, {}, null)}
    </div>
  );
};
