import React from 'react';
import ReactTextareaAutocomplete, { TriggerType } from '@webscopeio/react-textarea-autocomplete';
import { LoadingIndicator } from 'react-file-utils';
import { BaseEmoji, emojiIndex } from 'emoji-mart';
import { UR } from 'getstream';

export type TextareaProps = {
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
};

const defaultTriggers: TriggerType<BaseEmoji> = {
  ':': {
    component: function AutocompleteItem({ entity: { id, native } }) {
      return (
        <div>
          {native} {id}
        </div>
      );
    },
    output: (item) => ({ key: item.id, text: item.native, caretPosition: 'next' }),
    dataProvider: (token: string) => {
      const emojis = emojiIndex.search(token) || [];
      return emojis.slice(0, 10) as BaseEmoji[];
    },
  },
};

export const Textarea = ({
  innerRef,
  maxLength,
  onChange,
  onPaste,
  placeholder = 'Share your opinion',
  rows = 3,
  trigger = {},
  value,
}: TextareaProps) => {
  return (
    <ReactTextareaAutocomplete
      loadingComponent={LoadingIndicator}
      // @ts-expect-error
      trigger={{ ...defaultTriggers, ...trigger }}
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
      className="raf-textarea__textarea"
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
