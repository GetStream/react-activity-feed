import React, { MouseEvent } from 'react';
import { RealTimeMessage } from 'getstream';
import { Link } from './Link';
import { useTranslationContext } from '../context';

type Attributes = {
  addCount: number;
  count: number;
  deleteCount: number;
  labelPlural?: string;
  labelSingle?: string;
};

export type LabelFunction = (attributes: Attributes) => string | null;

export type NewActivitiesNotificationProps = {
  adds?: RealTimeMessage['new'];
  deletes?: RealTimeMessage['deleted'];
  labelFunction?: LabelFunction;
  labelPlural?: string;
  labelSingle?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

const generateText = (count: number | string, word: string) => `You have ${count} new ${word}`;

export const NewActivitiesNotification = ({
  adds = [],
  deletes = [],
  labelPlural,
  labelSingle,
  onClick,
  labelFunction,
}: NewActivitiesNotificationProps) => {
  const { t } = useTranslationContext();

  const attributes: Attributes = {
    addCount: adds.length,
    deleteCount: deletes.length,
    count: adds.length + deletes.length,
    labelPlural,
    labelSingle,
  };

  const defaultLabelFunction: LabelFunction =
    labelFunction ??
    (({ addCount, labelPlural, labelSingle }) => {
      if (!addCount) return null;

      if (addCount > 1)
        return labelPlural
          ? generateText(addCount, labelPlural)
          : t('You have {{ notificationCount }} new notifications', {
              notificationCount: addCount,
            });

      return labelSingle ? generateText(1, labelSingle) : t('You have 1 new notification');
    });

  const label = defaultLabelFunction(attributes);

  if (!label) return null;

  return (
    <button className="raf-new-activities-notification" type="button" onClick={onClick}>
      <Link>{label}</Link>
    </button>
  );
};
