import React from 'react';
import { TriggerType } from '@webscopeio/react-textarea-autocomplete';
import { UR } from 'getstream';
import { Data as EmojiDataSet } from 'emoji-mart';
import { PropsWithElementAttributes } from '../utils';
export declare type TextareaProps = PropsWithElementAttributes<{
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
export declare const Textarea: ({ emojiData, innerRef, maxLength, onChange, onPaste, placeholder, rows, trigger, value, className, style, }: TextareaProps) => JSX.Element;
//# sourceMappingURL=Textarea.d.ts.map