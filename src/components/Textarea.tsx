import React, { useMemo } from 'react';
import classNames from 'classnames';
import ReactTextareaAutocomplete, { TriggerType } from '@webscopeio/react-textarea-autocomplete';
import { LoadingIndicator } from 'react-file-utils';
import { BaseEmoji } from 'emoji-mart';
import { UR } from 'getstream';
import { NimbleEmojiIndex, Data as EmojiDataSet } from 'emoji-mart';
// @ts-expect-error
import EmojiIndex from 'emoji-mart/dist/utils/emoji-index/nimble-emoji-index';
import defaultEmojiData from '../utils/emojiData';
import { PropsWithElementAttributes } from '../utils';

export type TextareaProps = PropsWithElementAttributes<{
  /** Override the default emoji dataset, library has a light set of emojis
   * to show more emojis use your own or emoji-mart sets
   * https://github.com/missive/emoji-mart#datasets
   */
  emojiData?: EmojiDataSet;
  /** A ref that is bound to the textarea element */
  innerRef?: React.MutableRefObject<HTMLTextAreaElement | undefined> | ((el: HTMLTextAreaElement) => void);
  maxLength?: number;
  onChange?: (event: React.SyntheticEvent<HTMLTextAreaElement>) => void;
  onPaste?: (event: React.ClipboardEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  /** An extra trigger for ReactTextareaAutocomplete, this can be used to show
   * a menu when typing @xxx or #xxx, in addition to the emoji menu when typing :xxx
   */
  trigger?: TriggerType<UR>;
  value?: string;
}>;

const emojiTrigger: (emojiData: EmojiDataSet) => TriggerType<BaseEmoji> = (emojiData) => {
  const emojiIndex = new EmojiIndex(emojiData) as NimbleEmojiIndex;

  return {
    ':': {
      output: (item) => ({ key: item.id, text: item.native, caretPosition: 'next' }),
      dataProvider: (token: string) => (emojiIndex.search(token) || []).slice(0, 10) as BaseEmoji[],
      component: function AutocompleteItem({ entity: { id, native } }) {
        return (
          <div>
            {native} {id}
          </div>
        );
      },
    },
  };
};

export const Textarea = ({
  emojiData = defaultEmojiData,
  innerRef,
  maxLength,
  onChange,
  onPaste,
  placeholder = 'Share your opinion',
  rows = 3,
  trigger = {},
  value,
  className,
  style,
}: TextareaProps) => {
  const emoji = useMemo(() => emojiTrigger(emojiData), []);

  return (
    <ReactTextareaAutocomplete
      loadingComponent={LoadingIndicator}
      // @ts-expect-error
      trigger={{ ...emoji, ...trigger }}
      innerRef={
        innerRef &&
        ((el) => {
          if (typeof innerRef === 'function') {
            innerRef(el);
          } else if (innerRef !== null) {
            innerRef.current = el;
          }
        })
      }
      rows={rows}
      maxLength={maxLength}
      className={classNames('raf-textarea__textarea', className)}
      style={style}
      containerClassName="raf-textarea"
      dropdownClassName="raf-emojisearch"
      listClassName="raf-emojisearch__list"
      itemClassName="raf-emojisearch__item"
      placeholder={placeholder}
      onChange={onChange}
      onSelect={onChange}
      onPaste={onPaste}
      value={value}
    />
  );
};
