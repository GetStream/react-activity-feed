import React, { useMemo, MouseEventHandler } from 'react';
import { useTranslationContext } from '../Context';

export type ReactionIconProps = {
  /** The reaction counts for the activity */
  counts?: Record<string, number>;
  /** The height of the icon */
  height?: number;
  icon?: string | JSX.Element;
  /** The kind of reaction that this toggles */
  kind?: string;
  /** The label to display if the count is more than one (e.g "likes") */
  labelPlural?: string;
  /** The label to display if the count is one (e.g "like") */
  labelSingle?: string;
  /** Function to call when pressed, usually this should call
   * `props.onToggleReaction` */
  onPress?: MouseEventHandler<HTMLDivElement>;
  /** The width of the icon */
  width?: number;
};

export const ReactionIcon = ({ counts, kind, icon, labelPlural, labelSingle, onPress }: ReactionIconProps) => {
  const { t } = useTranslationContext();
  const count = counts?.[kind ?? ''] ?? 0;

  const label = useMemo(() => {
    const isPlural = count > 1 || count < 1;

    if (labelSingle && labelPlural) return `${count} ${isPlural ? labelPlural : labelSingle}`;

    if (kind !== 'comment' && kind !== 'repost' && kind !== 'like') return;

    // for future maintainers: this atrocity right here is intentional
    // and it is writen this way to allow i18next-extract evaluate keys
    // for extraction, there's no other reason
    switch (kind) {
      case 'comment':
        return isPlural ? t(`{{ countComments }} comments`, { countComments: count }) : t('1 comment');
      case 'like':
        return isPlural ? t(`{{ countLikes }} likes`, { countLikes: count }) : t('1 like');
      case 'repost':
        return isPlural ? t(`{{ countReposts }} reposts`, { countReposts: count }) : t('1 repost');
      default:
        return;
    }
  }, [count, labelSingle, labelPlural, kind]);

  return (
    <div className="raf-reaction-icon" role="button" onClick={onPress}>
      {icon && (typeof icon === 'string' ? <img className="raf-reaction-icon__image" src={icon} alt="" /> : icon)}
      <p className="raf-reaction-icon__label">{label}</p>
    </div>
  );
};
