// @flow

import * as React from 'react';
import type {
  ActivityArgData,
  ActivityResponse,
  ActivityGroupResponse,
  StreamClient,
  ReactionKindMap,
  UserResponse as StreamUserResponse,
  ReactionRequestOptions,
  ReactionResponse,
  OgData as OgDataGetStream,
} from 'getstream';
import type { AppCtx, FeedCtx } from './Context';

export type FlowRequestTypes =
  | 'get-user-info'
  | 'get-feed'
  | 'get-feed-next-page'
  | 'get-reactions-next-page'
  | 'get-notification-counts'
  | 'upload-image'
  | 'add-activity'
  | 'delete-activity'
  | 'add-reaction'
  | 'delete-reaction'
  | 'add-child-reaction'
  | 'delete-child-reaction';

export type UploadState = 'uploading' | 'finished' | 'failed';

export type FileLike = Blob | File;

export type UploadInfo = {|
  id: string,
  url?: string,
  state: UploadState,
|};

export type FileUpload = {|
  ...UploadInfo,
  file: File,
|};

export type ImageUpload = {|
  ...UploadInfo,
  file: Blob | File,
  previewUri?: string,
|};

export type ErrorHandler = (
  error: Error,
  type: FlowRequestTypes,
  details: {},
) => mixed;

type ReactComponentClass = Class<React.Component<any>>;
export type ReactComponentFunction = (
  props: any,
) => ?React.Element<any> | boolean | number | string;
export type ReactElementCreator = ReactComponentClass | ReactComponentFunction;
export type RenderableButNotElement = ?(
  | ReactElementCreator
  | boolean
  | number
  | string
);
export type Renderable = RenderableButNotElement | React.Element<any>;

export type ReactRefObjectOrFunction<ElementType> =
  | { -current: React.ElementRef<ElementType> | null }
  | ((React.ElementRef<ElementType> | null) => mixed);

export type BaseActivityResponse = ActivityResponse<{}, {}>;
export type BaseActivityGroupResponse = ActivityGroupResponse<{}, {}>;
export type BaseAppCtx = AppCtx<{}>;
export type BaseFeedCtx = FeedCtx;
export type BaseClient = StreamClient<{}>;

export type BaseReaction = ReactionResponse<{}, {}>;
export type BaseReactionMap = ReactionKindMap<Object, Object>;

export type BaseUserResponse = StreamUserResponse<{}>;

export type UserData = {
  name?: string,
  profileImage?: string,
};

export type OgData = OgDataGetStream;
export type FileInfo = {
  name: string,
  url: string,
  mimeType: string,
};
export type Attachments = {
  images?: Array<string>,
  og?: ?OgData,
  files?: Array<FileInfo>,
};
export type CustomActivityData = {
  text?: string,
  link?: boolean,
  image?: string,
  attachments?: Attachments,
};

export type CustomActivityArgData = ActivityArgData<{}, CustomActivityData>;

export type ActivityData = ActivityResponse<UserData, CustomActivityData>;

export type UserResponse = StreamUserResponse<UserData>;

export type ToggleReactionCallbackFunction = (
  kind: string,
  activity: BaseActivityResponse,
  data?: {},
  options?: { trackAnalytics?: boolean } & ReactionRequestOptions,
) => void | Promise<mixed>;

export type AddReactionCallbackFunction = (
  kind: string,
  activity: BaseActivityResponse,
  data?: {},
  options?: { trackAnalytics?: boolean } & ReactionRequestOptions,
) => void | Promise<mixed>;

export type RemoveReactionCallbackFunction = (
  kind: string,
  activity: BaseActivityResponse,
  id: string,
  options?: { trackAnalytics?: boolean },
) => void | Promise<mixed>;

export type ToggleChildReactionCallbackFunction = (
  kind: string,
  activity: BaseReaction,
  data: {},
  options?: { trackAnalytics?: boolean } & ReactionRequestOptions,
) => void | Promise<mixed>;

export type AddChildReactionCallbackFunction = (
  kind: string,
  activity: BaseReaction,
  data: {},
  options?: { trackAnalytics?: boolean } & ReactionRequestOptions,
) => void | Promise<mixed>;

export type RemoveChildReactionCallbackFunction = (
  kind: string,
  activity: BaseReaction,
  id: string,
  options?: { trackAnalytics?: boolean },
) => void | Promise<mixed>;

export type CommentData = {
  text: string,
};

export type Comment = ReactionResponse<UserData, CommentData>;

export type NotificationActivity = ActivityResponse<UserData, {}>;
export type NotificationActivities = Array<ActivityResponse<UserData, {}>>;

export type Emoji = {
  // The actual unicode emoji (e.g. 👍)
  native: string,
  // Colon representation (e.g. ":+1:")
  colons: string,
  // Colon representation (e.g. "+1")
  id: string,
  // Colon representation (e.g. Thumbs Up Sign)
  name: string,
  emoticons: Array<string>,
  skin: ?number,
  unified: string,
};

export type Trigger = {
  [triggerChar: string]: {|
    output?: (
      item: Object | string,
      trigger?: string,
    ) =>
      | {|
          key?: ?string,
          text: string,
          caretPosition: 'start' | 'end' | 'next' | number,
        |}
      | string
      | null,
    dataProvider: (
      token: string,
    ) => Promise<Array<Object | string>> | Array<Object | string>,
    allowWhitespace?: boolean,
    afterWhitespace?: boolean,
    component: React.Element<any>,
  |},
};
