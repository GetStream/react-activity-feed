import React, { useRef, useState, FormEvent, useEffect } from 'react';
import classNames from 'classnames';
import { EnrichedActivity, Activity } from 'getstream';
import { Data as EmojiDataSet } from 'emoji-mart';

import { Avatar } from './Avatar';
import { Button } from './Button';
import { Textarea, TextareaProps } from './Textarea';
import { inputValueFromEvent, PropsWithElementAttributes } from '../utils';
import { useFeedContext, useTranslationContext } from '../context';
import { DefaultAT, DefaultUT } from '../context/StreamApp';

export type CommentFieldProps<
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT
> = PropsWithElementAttributes<
  {
    activity: EnrichedActivity<UT, AT>;
    /** Override the default emoji dataset, library has a light set of emojis
     * to show more emojis use your own or emoji-mart sets
     * https://github.com/missive/emoji-mart#datasets
     */
    emojiData?: EmojiDataSet;
    image?: string;
    onSuccess?: () => void;
    placeholder?: string;
    targetFeeds?: string[];
    trigger?: TextareaProps['trigger'];
  },
  HTMLFormElement
>;

export const CommentField = <UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT>({
  activity,
  emojiData,
  onSuccess,
  image,
  placeholder,
  trigger,
  targetFeeds,
  className,
  style,
}: CommentFieldProps<UT, AT>) => {
  const feed = useFeedContext<UT, AT>();
  const { t } = useTranslationContext();
  const textareaReference = useRef<HTMLTextAreaElement>();
  const [text, setText] = useState<string>();

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement> | KeyboardEvent) => {
    event.preventDefault();

    if (!text) return;

    try {
      await feed.onAddReaction('comment', activity as Activity<AT>, { text }, { targetFeeds });
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
    <form onSubmit={handleFormSubmit} className={classNames('raf-comment-field', className)} style={style}>
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
