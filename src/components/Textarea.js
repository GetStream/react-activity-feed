// @flow
import * as React from 'react';

import { LoadingIndicator } from 'react-file-utils';

import { emojiIndex } from 'emoji-mart';
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';
import type { Trigger, ReactRefObjectOrFunction } from '../types';

export type Props = {|
  rows: number,
  maxLength?: number,
  placeholder: string,
  onChange: (event: SyntheticEvent<HTMLTextAreaElement> | Event) => mixed,
  onPaste: (event: SyntheticClipboardEvent<HTMLTextAreaElement>) => mixed,
  value?: string,
  /** A ref that is bound to the textarea element */
  innerRef?: ReactRefObjectOrFunction<HTMLTextAreaElement>,
  /** An extra trigger for ReactTextareaAutocomplete, this can be used to show
   * a menu when typing @xxx or #xxx, in addition to the emoji menu when typing
   * :xxx  */
  trigger?: Trigger,
|};

const AutocompleteItem = ({ entity: { id, native } }) => (
  <div>
    {native} {id}
  </div>
);

/**
 * Component is described here.
 *
 * @example ./examples/Textarea.md
 */
export default class Textarea extends React.Component<Props> {
  static defaultProps = {
    rows: 3,
    placeholder: 'Share your opinion',
    trigger: {},
  };

  render() {
    const { innerRef, trigger } = this.props;
    return (
      <ReactTextareaAutocomplete
        loadingComponent={LoadingIndicator}
        trigger={{
          ':': {
            dataProvider: (token) => {
              const emojis = emojiIndex.search(token) || [];
              return emojis.slice(0, 10);
            },
            component: AutocompleteItem,
            output: (item) => ({
              key: item.id,
              text: item.native,
              caretPosition: 'next',
            }),
          },
          ...trigger,
        }}
        innerRef={
          innerRef &&
          ((el) => {
            if (typeof innerRef === 'function') {
              innerRef(el);
            } else if (this.props.innerRef != null) {
              innerRef.current = el;
            }
          })
        }
        rows={this.props.rows}
        maxLength={this.props.maxLength}
        className="raf-textarea__textarea"
        containerClassName="raf-textarea"
        dropdownClassName="raf-emojisearch"
        listClassName="raf-emojisearch__list"
        itemClassName="raf-emojisearch__item"
        placeholder={this.props.placeholder}
        onChange={this.props.onChange}
        onSelect={this.props.onChange}
        onPaste={this.props.onPaste}
        value={this.props.value}
      />
    );
  }
}
