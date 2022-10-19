/// <reference types="react" />
import { EnrichedActivity } from 'getstream';
import { PropsWithElementAttributes } from '../utils';
import { DefaultUT, DefaultAT } from '../context/StreamApp';
export declare type AttachedActivityProps<UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT> = PropsWithElementAttributes<{
    activity: EnrichedActivity<UT, AT>;
}>;
export declare function AttachedActivity<UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT>({ activity: { object, verb, attachments, actor }, className, style, }: AttachedActivityProps<UT, AT>): JSX.Element | null;
//# sourceMappingURL=AttachedActivity.d.ts.map