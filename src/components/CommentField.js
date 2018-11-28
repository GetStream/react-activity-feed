// @flow

import React from 'react';
import Avatar from './Avatar';
import Button from './Button';
import Textarea from './Textarea';

import type {
  AddReactionCallbackFunction,
  BaseActivityResponse,
} from '../types';

export type Props = {|
  activity: BaseActivityResponse,
  onAddReaction: AddReactionCallbackFunction,
  kind: string,
  placeholder: string,
  image?: string,
  onSuccess?: () => mixed,
|};

type State = {|
  text: string,
|};

/**
 * Component is described here.
 *
 * @example ./examples/CommentField.md
 */
export default class CommentField extends React.Component<Props, State> {
  textareaRef = React.createRef();

  state = {
    text: '',
  };

  static defaultProps = {
    placeholder: 'Start Typing...',
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

  _onChange = (event: SyntheticEvent<HTMLTextAreaElement>) => {
    if (!event || !event.currentTarget) {
      return '';
    }
    const text = event.currentTarget.value;
    this.setState({ text });
  };

  componentDidMount() {
    if (this.textareaRef.current) {
      this.textareaRef.current.addEventListener('keydown', (e) => {
        if (e.which === 13) {
          if (
            this.textareaRef.current &&
            this.textareaRef.current.nextSibling === null
          ) {
            this.onSubmitForm(e);
          }
        }
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmitForm} className="raf-comment-field">
        {this.props.image ? (
          <Avatar image={this.props.image} circle size={39} />
        ) : null}
        <div className="raf-comment-field__group">
          <Textarea
            rows={1}
            value={this.state.text}
            placeholder={this.props.placeholder}
            onChange={this._onChange}
            onPaste={() => null}
            maxLength={280}
            innerRef={this.textareaRef}
          />
          <Button
            buttonStyle="primary"
            disabled={this.state.text === ''}
            type="submit"
          >
            post
          </Button>
        </div>
      </form>
    );
  }
}
