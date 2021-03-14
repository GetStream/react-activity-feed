import React, { ReactNode, useContext, useEffect, useState } from 'react';
import StreamAnalytics from 'stream-analytics';
import { connect, UnknownRecord, StreamClient, StreamUser, ClientOptions } from 'getstream';

import { FeedManager } from './FeedManager';
import { ErrorHandler, handleError } from '../utils/errors';
import { Streami18n } from '../i18n/Streami18n';
import { TranslationContextValue, TranslationProvider } from './TranslationContext';

export type SharedFeedManagers = Record<string, FeedManager>;
export type DefaultUserDataType = UnknownRecord & { name: string };

export type StreamAppProps<UserType extends DefaultUserDataType = DefaultUserDataType> = {
  apiKey: string;
  appId: string;
  token: string;
  analyticsToken?: string;
  children?: ReactNode;
  defaultUserData?: UserType;
  errorHandler?: ErrorHandler;
  i18nInstance?: Streami18n;
  options?: ClientOptions;
  sharedFeeds?: Array<{ feedGroup: string; notify: boolean; options: { mark_seen: boolean } }>; //TODO: options type
};

export type StreamContextValue<
  UserType extends DefaultUserDataType = DefaultUserDataType,
  ActivityType extends UnknownRecord = UnknownRecord,
  CollectionType extends UnknownRecord = UnknownRecord,
  ReactionType extends UnknownRecord = UnknownRecord,
  ChildReactionType extends UnknownRecord = UnknownRecord,
  PersonalizationType extends UnknownRecord = UnknownRecord
> = {
  analyticsClient: null | StreamAnalytics<UserType>;
  client: null | StreamClient<
    UserType,
    ActivityType,
    CollectionType,
    ReactionType,
    ChildReactionType,
    PersonalizationType
  >;
  errorHandler: ErrorHandler;
  sharedFeedManagers: SharedFeedManagers;
  user?: StreamUser<UserType>;
  userData?: UserType;
};

export const StreamContext = React.createContext<StreamContextValue>({
  analyticsClient: null,
  client: null,
  errorHandler: handleError,
  sharedFeedManagers: {},
});

export const useStreamContext = () => useContext(StreamContext);

/**
 * Manages the connection with Stream. Any components that should talk to
 * Stream should be a child of this component.
 */
export function StreamApp<
  UserType extends DefaultUserDataType = DefaultUserDataType,
  ActivityType extends UnknownRecord = UnknownRecord,
  CollectionType extends UnknownRecord = UnknownRecord,
  ReactionType extends UnknownRecord = UnknownRecord,
  ChildReactionType extends UnknownRecord = UnknownRecord,
  PersonalizationType extends UnknownRecord = UnknownRecord
>({
  apiKey,
  appId,
  errorHandler = handleError,
  i18nInstance,
  token,
  analyticsToken,
  children,
  defaultUserData,
  options,
  sharedFeeds = [{ feedGroup: 'notification', notify: true, options: { mark_seen: true } }],
}: StreamAppProps<UserType>) {
  const [client, setClient] = useState<StreamClient<
    UserType,
    ActivityType,
    CollectionType,
    ReactionType,
    ChildReactionType,
    PersonalizationType
  > | null>(null);
  const [analyticsClient, setAnalyticsClient] = useState<StreamAnalytics<UserType> | null>(null);
  const [user, setUser] = useState<StreamUser<UserType>>();
  const [userData, setUserDate] = useState<UserType>();
  const [translator, setTranslator] = useState<TranslationContextValue>();
  const [sharedFeedManagers, setSharedFeedManagers] = useState<SharedFeedManagers>({});

  useEffect(() => {
    const streami18n =
      i18nInstance && i18nInstance instanceof Streami18n ? i18nInstance : new Streami18n({ language: 'en' });

    streami18n.getTranslators().then(setTranslator);
    streami18n.registerSetLanguageCallback((t) =>
      setTranslator((prevState) => ({ ...(prevState as TranslationContextValue), t })),
    );
  }, [i18nInstance]);

  const getUserInfo = async (user: StreamUser<UserType>) => {
    try {
      const { data } = await user.getOrCreate((defaultUserData || { name: 'Unknown' }) as UserType);
      setUserDate(data);
    } catch (e) {
      errorHandler(e, 'get-user-info', { userId: user.id });
    }
  };

  useEffect(() => {
    const client = connect<
      UserType,
      ActivityType,
      CollectionType,
      ReactionType,
      ChildReactionType,
      PersonalizationType
    >(apiKey, token, appId, options || {});

    let analyticsClient: StreamAnalytics<UserType> | null = null;
    if (analyticsToken) {
      analyticsClient = new StreamAnalytics<UserType>({ apiKey, token: analyticsToken });
      analyticsClient.setUser(client.userId as string);
    }

    const feeds = {};
    for (const feedProps of sharedFeeds) {
      const manager = new FeedManager({ ...feedProps, client, analyticsClient, errorHandler, user }); // TODO: add req context props
      // @ts-expect-error
      feeds[manager.feed().id] = manager;
    }

    setClient(client);
    setUser(client.currentUser as StreamUser<UserType>);
    setAnalyticsClient(analyticsClient);
    setSharedFeedManagers(feeds);

    getUserInfo(client.currentUser as StreamUser<UserType>).then();

    //@ts-expect-error
    return () => client?.fayeClient?.disconnect();
  }, [apiKey, token, appId, analyticsClient]);

  if (!translator?.t) return null;

  return (
    <StreamContext.Provider value={{ client, analyticsClient, errorHandler, userData, user, sharedFeedManagers }}>
      <TranslationProvider value={translator}>
        <>{children || 'You are connected to Stream, Throw some components in here!'}</>
      </TranslationProvider>
    </StreamContext.Provider>
  );
}

// TODO: remove this once its not used anywhere else
StreamApp.Consumer = function StreamAppConsumer(props: unknown) {
  return (
    <StreamContext.Consumer>
      {(appCtx) => {
        // @ts-expect-error
        if (!props.children || !props.children.length) return null;
        if (!appCtx.client || !appCtx.user)
          throw new Error('This component should be a child of a StreamApp component');

        // @ts-expect-error
        const Child = props.children;
        return Child(appCtx);
      }}
    </StreamContext.Consumer>
  );
};
