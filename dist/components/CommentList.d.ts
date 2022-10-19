/// <reference types="react" />
import { UR } from 'getstream';
import { ElementOrComponentOrLiteralType } from '../utils';
import { DefaultUT, DefaultAT } from '../context/StreamApp';
import { LoadMorePaginatorProps } from './LoadMorePaginator';
import { CommentItemProps } from './CommentItem';
export declare type CommentListProps<UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, // eslint-disable-line
CT extends UR = UR, // eslint-disable-line
RT extends UR = UR, CRT extends UR = UR> = {
    /** The ID of the activity for which these comments are */
    activityId: string;
    /** Only needed for reposted activities where you want to show the comments
     * of the original activity, not of the repost */
    activityPath?: Array<string>;
    /** The component that should render the comment
     * #CommentItem (Component)#
     */
    CommentItem?: ElementOrComponentOrLiteralType<CommentItemProps<UT, RT, CRT>>;
    /** Show and load comments starting with the oldest reaction first, instead
     * of the default where comments are displayed and loaded most recent first.
     */
    oldestToNewest?: boolean;
    /** By default pagination is done with a "Load more" button, you can use
     * [InfiniteScrollPaginator](/components/infinite-scroll) to enable infinite scrolling
     * #LoadMorePaginator (Component)#
     */
    Paginator?: ElementOrComponentOrLiteralType<LoadMorePaginatorProps>;
    /** Reverse the order the comments are displayed in. */
    reverseOrder?: boolean;
};
export declare const CommentList: <UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, CT extends UR = UR, RT extends UR = UR, CRT extends UR = UR, PT extends UR = UR>({ Paginator, CommentItem, activityId, activityPath, oldestToNewest, reverseOrder, }: CommentListProps<UT, AT, CT, RT, CRT>) => JSX.Element;
//# sourceMappingURL=CommentList.d.ts.map