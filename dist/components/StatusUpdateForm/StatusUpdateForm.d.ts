import { ReactNode } from 'react';
import { Activity, NewActivity, UR } from 'getstream';
import { DefaultAT, DefaultUT } from '../../context';
import { ElementOrComponentOrLiteralType, PropsWithElementAttributes } from '../../utils';
import { TextareaProps } from '../Textarea';
import { EmojiPickerProps } from '../EmojiPicker';
export declare type StatusUpdateFormProps<AT extends DefaultAT = DefaultAT> = PropsWithElementAttributes<{
    /** The verb that should be used to post the activity, default to "post" */
    activityVerb?: string;
    /** Override Post request */
    doRequest?: (activity: NewActivity<AT>) => Promise<Activity<AT>>;
    /** Override the default emoji dataset, library has a light set of emojis
     * to show more emojis use your own or [emoji-mart sets](https://github.com/missive/emoji-mart#datasets)
     */
    emojiData?: EmojiPickerProps['emojiData'];
    /** Override the default i18n dictionary providing your own translations where necessary */
    emojiI18n?: EmojiPickerProps['i18n'];
    /** The feed group part of the feed that the activity should be posted to, default to "user" */
    feedGroup?: string;
    /** Add extra footer item */
    FooterItem?: ReactNode;
    /** The header to display */
    Header?: ReactNode;
    /** If you want to change something about the activity data that this form
     * sends to stream you can do that with this function. This function gets the
     * activity data that the form would send normally and should return the
     * modified activity data that should be posted instead.
     *
     * For instance, this would add a target field to the activity:
     *
     * ```javascript
     * &lt;StatusUpdateForm
     *   modifyActivityData={(data) => ({...data, target: 'Group:1'})}
     * />
     * ```
     * */
    modifyActivityData?: (activity: NewActivity<AT>) => NewActivity<AT>;
    /** A callback to run after the activity is posted successfully */
    onSuccess?: (activity: Activity<AT>) => void;
    /** Custom Textarea component implementation */
    Textarea?: ElementOrComponentOrLiteralType<Omit<TextareaProps, 'maxLength' | 'rows'>>;
    /** An extra trigger for ReactTextareaAutocomplete, this can be used to show
     * a menu when typing @xxx or #xxx, in addition to the emoji menu when typing
     * :xxx  */
    trigger?: TextareaProps['trigger'];
    /** The user_id part of the feed that the activity should be posted to  */
    userId?: string;
}>;
export declare function StatusUpdateForm<UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, CT extends UR = UR, RT extends UR = UR, CRT extends UR = UR, PT extends UR = UR>({ feedGroup, activityVerb, modifyActivityData, emojiData, emojiI18n, Header, FooterItem, Textarea, trigger, doRequest, userId, onSuccess, style, className, }: StatusUpdateFormProps<AT>): JSX.Element;
//# sourceMappingURL=StatusUpdateForm.d.ts.map