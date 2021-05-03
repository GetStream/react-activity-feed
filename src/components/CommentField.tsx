import React, { useRef, useState, FormEvent, useEffect } from 'react';
import { EnrichedActivity } from 'getstream';
import { Data as EmojiDataSet } from 'emoji-mart';

import { Avatar } from './Avatar';
import { Button } from './Button';
import { Textarea, TextareaProps } from './Textarea';
import { inputValueFromEvent } from '../utils';
import { useFeedContext, useTranslationContext } from '../context';
import { DefaultAT, DefaultUT } from '../context/StreamApp';

export type CommentFieldProps<UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT> = {
  activity: EnrichedActivity<UT, AT>;
  /** Override the default emoji dataset, library has a light set of emojis
   * to show more emojis use your own or emoji-mart sets
   * https://github.com/missive/emoji-mart#datasets
   */
  emojiData?: EmojiDataSet;
  image?: string;
  kind?: string;
  onSuccess?: () => void;
  placeholder?: string;
  trigger?: TextareaProps['trigger'];
};

export const CommentField = <UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT>({
  activity,
  emojiData,
  onSuccess,
  image,
  placeholder,
  trigger,
}: CommentFieldProps<UT, AT>) => {
  const feed = useFeedContext<UT, AT>();
  const { t } = useTranslationContext();
  const textareaReference = useRef<HTMLTextAreaElement>();
  const [text, setText] = useState<string>();

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement> | KeyboardEvent) => {
    event.preventDefault();

    if (!text) return;

    try {
      await feed.onAddReaction('comment', activity, { text });
    } catch (error) {
      console.error(error);
    }

    setText('');
    onSuccess?.();
  };

  useEffect(() => {
    if (!textareaReference.current) return;

    const handleFormSubmitKey = (event: KeyboardEvent) => {
      const { current: textarea } = textareaReference;
      if (event.key === 'Enter' && textarea?.nextSibling === null) {
        handleFormSubmit(event);
      }
    };

    textareaReference.current.addEventListener('keydown', handleFormSubmitKey);

    return () => textareaReference.current?.removeEventListener('keydown', handleFormSubmitKey);
  }, []);

  return (
    <form onSubmit={handleFormSubmit} className="raf-comment-field">
      {image && <Avatar image={image} circle size={39} />}
      <div className="raf-comment-field__group">
        <Textarea
          rows={1}
          value={text}
          placeholder={placeholder ?? t('Start Typing...')}
          onChange={(event) => setText((pv) => inputValueFromEvent<HTMLTextAreaElement>(event) ?? pv)}
          emojiData={emojiData}
          trigger={trigger}
          maxLength={280}
          innerRef={(element) => (textareaReference.current = element)}
        />
        <Button buttonStyle="primary" disabled={!text} type="submit">
          {t('Post')}
        </Button>
      </div>
    </form>
  );
};
