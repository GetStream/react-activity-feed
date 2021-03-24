import React, { useMemo, MouseEventHandler } from 'react';
import { useTranslationContext } from '../Context';

export type ReactionIconProps = {
  counts?: Record<string, number>;
  height?: number;
  icon?: string | JSX.Element;
  kind?: string;
  labelPlural?: string;
  labelSingle?: string;
  onPress?: MouseEventHandler<HTMLDivElement>;
  width?: number;
};

const generateText = (count: number | string, word: string) => `${count} ${word}`;

export const ReactionIcon = ({ counts, kind, icon, labelPlural, labelSingle, onPress }: ReactionIconProps) => {
  const { t } = useTranslationContext();
  const count = counts?.[kind ?? ''] ?? 0;

  const label = useMemo(() => {
    const isPlural = count > 1 || count < 1;

    if (labelSingle && labelPlural) return generateText(count, isPlural ? labelPlural : labelSingle);

    if (kind !== 'comment' && kind !== 'repost' && kind !== 'like') return;

    return t(
      generateText(isPlural ? '{{ count }}' : count, isPlural ? `${kind}s` : kind),
      isPlural ? { count } : undefined,
    );
  }, [count, labelSingle, labelPlural, kind]);

  return (
    <div className="raf-reaction-icon" role="button" onClick={onPress}>
      {icon && (typeof icon === 'string' ? <img className="raf-reaction-icon__image" src={icon} alt="" /> : icon)}
      <p className="raf-reaction-icon__label">{label}</p>
    </div>
  );
};
