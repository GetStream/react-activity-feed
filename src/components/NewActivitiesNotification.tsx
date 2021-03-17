import React, { useContext, useCallback, useMemo, MouseEvent } from 'react';
import { RealTimeMessage } from 'getstream';
import { Link } from './Link';
import { TranslationContext } from '../Context';

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
  const { t } = useContext(TranslationContext);

  const attributes: Attributes = useMemo(
    () => ({
      addCount: adds.length,
      deleteCount: deletes.length,
      count: adds.length + deletes.length,
      labelPlural,
      labelSingle,
    }),
    [adds.length, deletes.length, labelPlural, labelSingle],
  );

  const defaultLabelFunction: LabelFunction = useCallback(
    labelFunction
      ? labelFunction
      : ({ addCount, labelPlural, labelSingle }) => {
          if (!addCount) return null;

          if (addCount > 1)
            return labelPlural
              ? generateText(addCount, labelPlural)
              : t(generateText('{{ notificationCount }}', 'notifications'), {
                  notificationCount: addCount,
                });

          return labelSingle ? generateText(1, labelSingle) : t(generateText(1, 'notification'));
        },
    [t, labelFunction],
  );

  const label = useMemo(() => defaultLabelFunction(attributes), [defaultLabelFunction, attributes]);

  if (!label) return null;

  return (
    <button className="raf-new-activities-notification" type="button" onClick={onClick}>
      <Link>{label}</Link>
    </button>
  );
};
