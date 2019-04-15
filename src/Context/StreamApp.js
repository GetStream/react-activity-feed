// @flow

import * as React from 'react';
import stream from 'getstream';

import StreamAnalytics from 'stream-analytics';
import type { StreamClient, StreamUser } from 'getstream';

import type { ErrorHandler } from '../types';

import { FeedManager } from './FeedManager';
import type { FeedProps } from './Feed';
import { handleError } from '../errors';

export const StreamContext = React.createContext({
  changedUserData: () => {},
  sharedFeedManagers: {},
});

export type AppCtx<UserData> = {|
  client: StreamClient<UserData>,
  user: StreamUser<UserData>,
  // We cannot simply take userData from user.data, since the reference to user
  // will stay the same all the time. Because of this react won't notice that
  // the internal fields changed so it thinks it doesn't need to rerender.
  userData: ?UserData,
  changedUserData: () => void,
  changeNotificationCounts?: any,
  analyticsClient?: any,
  sharedFeedManagers: { [string]: FeedManager },
  errorHandler: ErrorHandler,
|};

type StreamAppProps<UserData> = {|
  /** The ID of your app, can be found on the [Stream dashboard](https://getstream.io/dashboard) */
  appId: string | number,
  /** The API key for your app, can be found on the [Stream dashboard](https://getstream.io/dashboard) */
  apiKey: string,
  /** The access token for the end user that uses your website, how to generate it can be found [here](https://getstream.io/docs/#frontend_setup) */
  token: string,
  /** Any options that [`stream.connect()`](https://getstream.io/docs/#setup) accepts */
  options?: {},
  analyticsToken?: string,
  /** Normaly feed state is local to the feed component, such as FlatFeed and
   * NotificationFeed. This means that changes in one feed don't affect the
   * other. However in some cases you want the state to be shared in multiple
   * components. In the case of the NotificationDropdown you need state shared
   * between the NotificationFeed and the dropdown badge. This prop should be
   * used in those cases. Each element in the array provided to `sharedFeeds`
   * will create one globally managed feed. The default of this prop makes sure
   * that the NotificationDropdown works correctly. If you want need to change
   * some props on the NotificationDropdown, you should change them here
   * instead.
   */
  sharedFeeds: Array<FeedProps>,
  /** The data a user should get when no data is present in stream for this user yet */
  defaultUserData: UserData,
  /** A callback to handle errors produced by the components. This should
   * probably hook into your own notification system. */
  errorHandler: ErrorHandler,
  children?: React.Node,
|};

type StreamAppState<UserData> = AppCtx<UserData>;

/**
 * Manages the connection with Stream. Any components that should talk to
 * Stream should be a child of this component.
 */
export class StreamApp extends React.Component<
  StreamAppProps<Object>,
  StreamAppState<Object>,
> {
  static defaultProps = {
    sharedFeeds: [
      {
        feedGroup: 'notification',
        notify: true,
        options: { mark_seen: true },
      },
    ],
    defaultUserData: { name: 'Unknown' },
    errorHandler: handleError,
  };

  static Consumer = function StreamAppConsumer(props: {
    children?: (AppCtx<any>) => ?React.Element<any>,
  }) {
    return (
      <StreamContext.Consumer>
        {(appCtx) => {
          if (!props.children || !props.children.length) {
            return null;
          }
          if (!appCtx.client || !appCtx.user) {
            throw new Error(
              'This component should be a child of a StreamApp component',
            );
          }
          const Child = props.children;
          return Child(appCtx);
        }}
      </StreamContext.Consumer>
    );
  };

  constructor(props: StreamAppProps<Object>) {
    super(props);

    this.state = StreamApp.initClientState(props, {
      changedUserData: () => {
        this.setState({ userData: this.state.user.data });
      },
    });
  }

  componentDidUpdate(prevProps: StreamAppProps<Object>) {
    if (
      this.props.apiKey !== prevProps.apiKey ||
      this.props.token !== prevProps.token ||
      this.props.appId !== prevProps.appId
    ) {
      this.getUserInfo();
    }
  }

  componentDidMount() {
    this.getUserInfo();
  }

  static getDerivedStateFromProps(
    props: StreamAppProps<Object>,
    state: StreamAppState<Object>,
  ) {
    if (
      state.client.apiKey !== props.apiKey ||
      state.client.token !== props.token ||
      state.client.appId !== props.appId
    ) {
      return StreamApp.initClientState(props, state);
    }
    return null;
  }

  static initClientState = function(
    props: StreamAppProps<Object>,
    state: Object,
  ) {
    const client: StreamClient<Object> = stream.connect(
      props.apiKey,
      props.token,
      props.appId,
      props.options || {},
    );

    let analyticsClient;
    if (props.analyticsToken) {
      analyticsClient = new StreamAnalytics({
        apiKey: props.apiKey,
        token: props.analyticsToken,
      });
      analyticsClient.setUser(client.userId);
    }

    const newState = {
      ...state,
      client,
      user: client.currentUser,
      userData: client.currentUser.data,
      analyticsClient,
      sharedFeedManagers: {},
      errorHandler: props.errorHandler,
      apiKey: props.apiKey,
      token: props.token,
      appId: props.appId,
    };

    for (const feedProps of props.sharedFeeds) {
      const manager = new FeedManager({
        ...feedProps,
        ...newState,
      });
      newState.sharedFeedManagers[manager.feed().id] = manager;
    }

    return newState;
  };

  getUserInfo = async () => {
    try {
      await this.state.user.getOrCreate(this.props.defaultUserData);
    } catch (e) {
      this.props.errorHandler(e, 'get-user-info', {
        userId: this.state.user.id,
      });
      return;
    }
    this.state.changedUserData();
  };

  render() {
    return (
      <StreamContext.Provider value={{ ...this.state }}>
        <React.Fragment>
          {this.props.children || (
            <React.Fragment>
              <div
                style={{
                  width: 100 + '%',
                  height: 100 + '%',
                  minHeight: 400,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  backgroundColor: '#008AFF',
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol',
                }}
              >
                <h3>You are connected to:</h3>
                <svg width="117" height="21" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" fillRule="evenodd">
                    <path
                      className="stream"
                      d="M48.812 16.9c.168-.15.317-.317.448-.504.13-.187.196-.401.196-.644 0-.299-.107-.55-.322-.756a2.794 2.794 0 0 0-.784-.518 4.892 4.892 0 0 0-.966-.322c-.336-.075-.616-.14-.84-.196a13.04 13.04 0 0 1-1.736-.546 5.849 5.849 0 0 1-1.414-.784 3.53 3.53 0 0 1-.952-1.092c-.233-.42-.35-.92-.35-1.498 0-.541.13-1.05.392-1.526a4.35 4.35 0 0 1 1.05-1.26 5.156 5.156 0 0 1 1.54-.868 5.387 5.387 0 0 1 1.862-.322c.579 0 1.13.084 1.652.252.523.168.994.397 1.414.686.42.29.775.64 1.064 1.05.29.41.48.868.574 1.372l-2.436.588a2.036 2.036 0 0 0-.728-1.12c-.373-.299-.887-.448-1.54-.448a2.69 2.69 0 0 0-.7.098 2.41 2.41 0 0 0-.672.294c-.205.13-.378.29-.518.476-.14.187-.21.401-.21.644 0 .261.08.485.238.672.159.187.35.34.574.462.224.121.467.22.728.294.261.075.504.14.728.196.99.243 1.81.504 2.464.784.653.28 1.176.588 1.568.924.392.336.667.705.826 1.106.159.401.238.854.238 1.358a3.6 3.6 0 0 1-.406 1.68 4.22 4.22 0 0 1-1.12 1.358 5.304 5.304 0 0 1-1.708.896 6.912 6.912 0 0 1-2.142.322c-1.157 0-2.189-.285-3.094-.854-.905-.57-1.517-1.33-1.834-2.282l2.296-1.036c.299.653.681 1.097 1.148 1.33.467.233.999.35 1.596.35.747 0 1.372-.205 1.876-.616zm12.276 2.772a9.115 9.115 0 0 1-2.268.476c-.747.056-1.419-.051-2.016-.322-.597-.27-1.083-.747-1.456-1.428-.373-.681-.56-1.638-.56-2.87V9.313h-2.226V6.356h.609c.727 0 1.376-.177 1.834-.916.194-.313.22-.633.243-1.502V2.913h2.332v3.443h2.749v2.957h-2.75l-.075 6.635c0 .448.051.803.154 1.064.103.261.275.457.518.588.243.13.56.196.952.196.392 0 .868-.037 1.428-.112l.532 1.988zM69.676 8.78l-.392-.168a5.38 5.38 0 0 0-.392-.112 1.957 1.957 0 0 0-.476-.056c-.541 0-1.045.089-1.512.266a3.849 3.849 0 0 0-1.204.714 3.372 3.372 0 0 0-.798 1.05 2.866 2.866 0 0 0-.294 1.274L64.58 20h-2.716V6.288h2.156l.56 1.484a4.134 4.134 0 0 1 1.47-1.302c.607-.327 1.367-.49 2.282-.49.597 0 1.279.084 2.044.252l-.7 2.548zm7.048 11.256c-.97 0-1.88-.182-2.73-.546a7.032 7.032 0 0 1-2.226-1.498 6.99 6.99 0 0 1-1.498-2.24 6.957 6.957 0 0 1-.546-2.744c0-.97.173-1.885.518-2.744a7.226 7.226 0 0 1 1.4-2.24A6.526 6.526 0 0 1 73.7 6.526a5.91 5.91 0 0 1 2.52-.546c.915 0 1.76.159 2.534.476A5.203 5.203 0 0 1 80.77 7.94c.57.672 1.013 1.526 1.33 2.562.317 1.036.476 2.273.476 3.71h-9.968c.13.485.336.938.616 1.358.28.42.611.784.994 1.092.383.308.812.546 1.288.714.476.168.975.252 1.498.252.71 0 1.367-.13 1.974-.392a4.925 4.925 0 0 0 1.554-1.036l1.68 1.68c-.653.653-1.451 1.176-2.394 1.568-.943.392-1.974.588-3.094.588zM76.22 8.444c-.43 0-.835.084-1.218.252a3.89 3.89 0 0 0-1.064.7 4.32 4.32 0 0 0-.84 1.064c-.233.41-.406.859-.518 1.344h7.084a4.331 4.331 0 0 0-.308-1.288 3.311 3.311 0 0 0-1.75-1.806c-.401-.177-.863-.266-1.386-.266zm20.9-2.156V20h-2.296l-.42-1.84a4.424 4.424 0 0 1-1.792 1.4 5.49 5.49 0 0 1-2.212.476 6.326 6.326 0 0 1-2.618-.546 6.712 6.712 0 0 1-2.128-1.498 7.162 7.162 0 0 1-1.442-2.24 7.116 7.116 0 0 1-.532-2.744c0-.97.177-1.885.532-2.744a7.162 7.162 0 0 1 1.442-2.24 6.712 6.712 0 0 1 2.128-1.498A6.326 6.326 0 0 1 90.4 5.98c.747 0 1.465.145 2.156.434.69.29 1.307.742 1.848 1.358l.42-1.484h2.296zm-6.72 11.34c.541 0 1.055-.121 1.54-.364a3.94 3.94 0 0 0 1.26-.994c.355-.42.635-.91.84-1.47.205-.56.308-1.157.308-1.792s-.103-1.232-.308-1.792a4.834 4.834 0 0 0-.84-1.47 3.94 3.94 0 0 0-1.26-.994 3.398 3.398 0 0 0-1.54-.364c-.541 0-1.055.121-1.54.364a3.94 3.94 0 0 0-1.26.994c-.355.42-.635.91-.84 1.47a5.164 5.164 0 0 0-.308 1.792c0 .635.103 1.232.308 1.792.205.56.485 1.05.84 1.47.355.42.775.751 1.26.994s.999.364 1.54.364zM101.808 20h-2.716V6.288h2.156l.56 1.148a5.135 5.135 0 0 1 1.204-1.022c.467-.29 1.036-.434 1.708-.434.261 0 .555.033.882.098.327.065.663.177 1.008.336a4.3 4.3 0 0 1 .994.644c.317.27.588.62.812 1.05.317-.579.798-1.078 1.442-1.498.644-.42 1.33-.63 2.058-.63.485 0 .999.075 1.54.224.541.15 1.045.43 1.512.84.467.41.85.98 1.148 1.708.299.728.448 1.67.448 2.828V20h-2.548v-8.448c0-1.157-.238-1.965-.714-2.422-.476-.457-1.106-.686-1.89-.686-.597 0-1.12.252-1.568.756-.448.504-.672 1.297-.672 2.38V20h-2.548v-8.448c0-1.157-.238-1.965-.714-2.422-.476-.457-1.106-.686-1.89-.686-.56 0-1.05.215-1.47.644-.42.43-.667 1.101-.742 2.016V20z"
                      fill="#fff"
                    />
                    <path
                      className="stream-mark"
                      d="M26.15 6.428l12.802-.908a1 1 0 0 1 .883 1.581L30.88 19.576a1 1 0 0 1-.812.417H9.982a1 1 0 0 1-.811-.416L.19 7.102a1 1 0 0 1 .882-1.582l12.764.908L19.29.333a1 1 0 0 1 1.496.006l5.364 6.09zm2.68 11.587l-8.309-3.105v3.105h8.31zm-9.309 0V14.91l-8.309 3.105h8.31zm-.959-3.847l-8.489 3.17-6.246-8.682 14.735 5.512zm2.9 0l8.49 3.17 6.246-8.682-14.735 5.512zm-1.933-.724V2.994l-6.941 7.837 6.941 2.613zm.992 0V2.996l6.942 7.835-6.942 2.613zm-9.969-3.336l1.597-1.794-7.802-.56 6.205 2.354zm18.863 0l-1.597-1.794 7.803-.56-6.206 2.354z"
                      fill="#fff"
                    />
                  </g>
                </svg>
              </div>
            </React.Fragment>
          )}
        </React.Fragment>
      </StreamContext.Provider>
    );
  }
}
