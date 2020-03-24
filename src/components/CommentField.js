// @flow

import React from 'react';
import Avatar from './Avatar';
import Button from './Button';
import Textarea from './Textarea';
import { inputValueFromEvent } from '../utils';

import type {
  AddReactionCallbackFunction,
  BaseActivityResponse,
  Trigger,
} from '../types';
import { withTranslationContext } from '../Context';
import type { Streami18Ctx } from '../Context';
export type Props = {|
  activity: BaseActivityResponse,
  onAddReaction: AddReactionCallbackFunction,
  kind: string,
  placeholder: string,
  image?: string,
  onSuccess?: () => mixed,
  trigger?: Trigger,
|} & Streami18Ctx;

type State = {|
  text: string,
|};

/**
 * Component is described here.
 *
 * @example ./examples/CommentField.md
 */
class CommentField extends React.Component<Props, State> {
  textareaRef = React.createRef();

  state = {
    text: '',
  };

  onSubmitForm = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (this.state.text !== '') {
      try {
        await this.props.onAddReaction('comment', this.props.activity, {
          text: this.state.text,
        });
      } catch (e) {
        return;
      }
      this.setState({ text: '' });
      if (this.props.onSuccess) {
        this.props.onSuccess();
      }
    }
  };

  _onChange = (event: SyntheticEvent<HTMLTextAreaElement> | Event) => {
    const text = inputValueFromEvent(event);
    if (text == null) {
      return;
    }
    this.setState({ text });
  };

  componentDidMount() {
    if (this.textareaRef.current) {
      this.textareaRef.current.addEventListener('keydown', (e) => {
        if (
          e.which === 13 &&
          this.textareaRef.current &&
          this.textareaRef.current.nextSibling === null
        ) {
          this.onSubmitForm(e);
        }
      });
    }
  }

  render() {
    const { t, placeholder } = this.props;
    return (
      <form onSubmit={this.onSubmitForm} className="raf-comment-field">
        {this.props.image ? (
          <Avatar image={this.props.image} circle size={39} />
        ) : null}
        <div className="raf-comment-field__group">
          <Textarea
            rows={1}
            value={this.state.text}
            placeholder={placeholder || t('Start Typing...')}
            onChange={this._onChange}
            trigger={this.props.trigger}
            onPaste={() => null}
            maxLength={280}
            innerRef={this.textareaRef}
          />
          <Button
            buttonStyle="primary"
            disabled={this.state.text === ''}
            type="submit"
          >
            {t('Post')}
          </Button>
        </div>
      </form>
    );
  }
}

export default withTranslationContext(CommentField);
