// @flow

import React from 'react';
import Avatar from './Avatar';
import Button from './Button';
import Textarea from './Textarea';
import { inputValueFromEvent, autoSize } from '../utils';
import photo from '../images/photo.svg';
import icoSend from '../images/ic-send.svg';

import type {
  AddReactionCallbackFunction,
  BaseActivityResponse,
  Trigger,
} from '../types';

export type Props = {|
  activity: BaseActivityResponse,
  onAddReaction: AddReactionCallbackFunction,
  kind: string,
  placeholder: string,
  image?: string,
  onSuccess?: () => mixed,
  trigger?: Trigger,
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
    placeholder: 'Write a comment...',
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
    return (
      <form onSubmit={this.onSubmitForm} className="send-comment">
        {this.props.image ? (
          <Avatar image={this.props.image} circle size={39} />
        ) : null}
        <div className="textarea-wrapper">
          <Textarea
            rows={1}
            value={this.state.text}
            placeholder={this.props.placeholder}
            onChange={this._onChange}
            trigger={this.props.trigger}
            onPaste={() => null}
            innerRef={this.textareaRef}
            onInput={autoSize}
          />
          <Button
            disabled={this.state.text === ''}
            hidden={this.state.text === ''}
            type="submit"
          >
            <img src={icoSend} alt="" className="cursor margin-left-10" />
          </Button>
          <img src={photo} alt="" className="cursor margin-left-10" />
        </div>
      </form>
    );
  }
}
