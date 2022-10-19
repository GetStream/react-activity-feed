/// <reference types="react" />
import { UR, EnrichedReaction } from 'getstream';
import { LoadMorePaginatorProps } from './LoadMorePaginator';
import { DefaultUT, DefaultAT } from '../context';
import { ElementOrComponentOrLiteralType } from '../utils';
export declare type ReactionListType<UT extends DefaultUT = DefaultUT, RT extends UR = UR, CRT extends UR = UR> = {
    /** The ID of the activity for which these reactions are */
    activityId: string;
    /** The component that should render the reaction */
    Reaction: ElementOrComponentOrLiteralType<{
        reaction: EnrichedReaction<RT, CRT, UT>;
        key?: string;
    }>;
    /** The reaction kind that you want to display in this list, e.g `like` or `comment` */
    reactionKind: string;
    /** Only needed for reposted activities where you want to show the reactions
     * of the original activity, not of the repost */
    activityPath?: string[];
    /** Show and load reactions starting with the oldest reaction first, instead
     * of the default where reactions are displayed and loaded most recent first. */
    oldestToNewest?: boolean;
    /** By default pagination is done with a "Load more" button, you can use
     * [InfiniteScrollPaginator](/components/infinite-scroll) to enable infinite scrolling
     * #LoadMorePaginator (Component)#
     */
    Paginator?: ElementOrComponentOrLiteralType<LoadMorePaginatorProps>;
    /** Reverse the order the reactions are displayed in. */
    reverseOrder?: boolean;
};
export declare const ReactionList: <UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, CT extends UR = UR, RT extends UR = UR, CRT extends UR = UR, PT extends UR = UR>({ activityId, Reaction, reactionKind, activityPath: defaultActivityPath, oldestToNewest, Paginator, reverseOrder, }: ReactionListType<UT, RT, CRT>) => JSX.Element;
//# sourceMappingURL=ReactionList.d.ts.map