/// <reference types="react" />
import { EnrichedActivity } from 'getstream';
import { Data as EmojiDataSet } from 'emoji-mart';
import { TextareaProps } from './Textarea';
import { PropsWithElementAttributes } from '../utils';
import { DefaultAT, DefaultUT } from '../context/StreamApp';
export declare type CommentFieldProps<UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT> = PropsWithElementAttributes<{
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
}, HTMLFormElement>;
export declare const CommentField: <UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT>({ activity, emojiData, onSuccess, image, placeholder, trigger, targetFeeds, className, style, }: CommentFieldProps<UT, AT>) => JSX.Element;
//# sourceMappingURL=CommentField.d.ts.map