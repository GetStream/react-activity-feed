# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 1.4.0 - 2022-03-11

### Feature

- Handle string timestamps with timezone in format ±hh:mm by @danypype in #314
- Allow use of custom Textarea component in StatusUpdateForm by @MartinCupela in #342

### Fix

- Token "-" causes the emoji search to fail in StatusUpdateForm by @MartinCupela in #336
- Forward doReactionsFilterRequest prop within NotificationFeed by @MartinCupela in #320

## 1.3.4 - 2021-11-04

### Fix

- Feed re-renders on options props change by @arnautov-anton in #313

## 1.3.3 - 2021-10-29

### Fix

- Removal of child reactions from latest_children #312

## 1.3.2 - 2021-10-28

### Fix

- `illegal invocation` issue that prevented users from using any input fields (#311)

## 1.3.1 - 2021-10-15

### Fix

- return value type for `FeedProps.doReactionAddRequest` to be `Promise<ReactionAPIResponse<RT>>` #309

## 1.3.0 - 2021-09-28

### Feature

- Supporting Spanish #293
- Added `i18n` property and default translations to `EmojiPicker` component #296
- Added `className` and `style` properties to all default components for easier styling (using styled-components or emotion) #302

### Fix

- pasting text with special characters would result in error #278
- `ActivityHeader` is exported #283
- `FeedManager.cancel` called correctly #285, #263

### Chore

- Bumped versions of `getsream`, `react-file-utils`, `tslib`
- Replaced `node-sass` with `dart-sass`

## 1.2.1 - 2021-7-5

### Fix

- Fix StatusUpdateForm paste error #279

## 1.2.0 - 2021-5-26

### Fix

- Removed Fort Awesome packages and replaced them with custom icons #272 #271

### Chore

- Bump `react-file-utils` version, reducing bundle size by 20% #273

## 1.1.1 - 2021-5-20

### Feature

- `Activity` component accepts a custom `Card` prop #268

### Fix

- Add `tslib` to dependencies #269
- `FlatFeed` clean up properly on feed group change #267

## 1.1.0 - 2021-5-17

- Preserve modules for better tree shaking #261

## 1.0.1 - 2021-05-12

### Fix

- Fix built package

## 1.0.0 - 2021-05-07

Version 1.x is a major revamp of the SDK and comes with some breaking changes. This release also comes with lots of small bug fixes, using react Context API and hooks, and full typescript support. Some dependencies has been replaced or removed due to their lack of support.

### Features

- Typescript support
- Bundle size reduced by 40%
- SCSS support
- Node v16 support

### ⚠️ BREAKING CHANGES ⚠️

- Node v10 support is dropped.
- Flow support has been removed in favor of Typescript.
- `dist/index.es.css` is deleted in favor of `dist/index.css`.
- `InfiniteScroll` component no longer supports `getScrollParent` property, scroll parent is now calculated within this component when `useWindow` property is set to `false`.
- `Gallery` component replaced `react-images` with `react-image-lightbox`.
- Text render uses `linkifyjs` instead of `anchorme` for better future support.
- `B2BTimeline`, `B2BActivity`, `Modal` components and `StreamApp.Consumer` are removed.
- `EmojiPicker` component ships with a lighter set of emojis to reduce bundle size. `StatusUpdateForm` and `CommentField` accepts a custom prop `emojiData` that allows extending default emoji list.
- `FlatFeed`, `NotificationDropdown`, `NotificationFeed` no longer pass down the `FeedManager` props to activities.
- `CommentList`, `CommentField`, `LikeButton`, `ReactionList` use context values and no longer accepts feed manager props.

### Fix

- Full browser build

## 0.10.9 - 2021-02-18

### Fix

- `CommentItem` crash on undefined user #146

## 0.10.8 - 2021-01-22

- Close Faye connection on StreamApp unmount #135

## 0.10.7 - 2021-01-15

- `textRenderer` supports new line in input texts #133

## 0.10.6 - 2020-12-15

- Fix userId source in `addReaction` and `addChildReaction` #132

## 0.10.5 - 2020-12-15

- Add userId to `addReaction` and `addChildReaction` if its missing #131
- Fix timestamps for comment and userbar #130

## 0.10.4 - 2020-10-19

- Updated Video component to correctly render youtube videos

## 0.10.3 - 2020-10-13

- Updated Video component to correctly render youtube videos

## 0.10.2 - 2020-04-10

- Moving `@webscopeio/react-textarea-autocomplete/style.css` to vendor directory, to fix build.

## 0.10.1 - 2020-03-31

- Adding i18n support. Please read the docs here: https://getstream.github.io/react-activity-feed/#internationalisation-i18n

## 0.10.0 - 2020-03-31

**THIS IS A BAD VERSION/RELEASE, PLESAE USE 0.10.1**

## 0.9.26 - 2020-01-09

- Removed alerts from library

## 0.9.24 - 2019-11-25

- Add ActivityFooter component to exported components
- Add url-parse to dependencies
- Fix docs data

## 0.9.23 - 2019-10-01

### Added

- Props `useWindow` and `getScrollParent` to `InfiniteScrollPaginator`. This allows you to add scrollListeners to a diffent element than the window.

## 0.9.20 - 2019-07-24

### Added

- Exposing FeedManager via FeedContext

## 0.8.0 - 2019-02-12

### Breaking changes

Components related to uploading files have been moved to the separate
[`react-file-utils`](https://github.com/GetStream/react-file-utils) library.
These components are not exported anymore from this library for clarity and
consistency. Following is the list of components that have been moved to
`react-file-utils`:

- `FileIcon`
- `FilePreviewer`
- `FileUploadButton`
- `IconButton`
- `ImageDropzone`
- `ImagePreviewer`
- `ImageUploadButton`
- `LoadingIndicator`
- `Thumbnail`
- `ThumbnailPlaceholder`

What you need to change:

- If you imported any of these components directly from `react-activity-feed`
  you should now import them from `react-file-utils`.
- If you've overridden the styles for these components you will need to modify
  it to change the class prefix from `raf-` to `rfu-`.

### Fixed

- `DropdownPanenl`/`NotificationDropdown`: Correct some styling issues

### Chore

- Fix build warnings

## 0.7.5 - 2019-02-12

### Changed

- `StatusUpdateForm`: Pass response of adding the activity to `onSuccess`
  callback

## 0.7.4 - 2019-02-12

### Fixed

- Don't override styling on body
- Export the Paginator components

## 0.7.3 - 2019-02-05

### Fixed

- Fix a bug where pagination would be messed up when marking all notification
  groups as seen/read.

## 0.7.2 - 2019-02-05

### Added

- Support marking all notifications as read/seen by using `true` as an argument to
  `onMarkAsRead`/`onMarkAsSeen`

### Fixed

- `onClickUser` handler for `Notification` is now forwarded to the embedded
  `AvatarGroup` as well.

## 0.7.1 - 2019-02-05

### Added

- Support reading comments from oldest to newest
- Support for displaying comments in revered order, i.e. the load more button at
  the top.

## 0.7.0 - 2019-02-05

### Breaking changes

- `AvatarGroup` now takes a list of `UserResponse` in it's `user` argument
  instead of a list of `UserData`.

### Added

- Support marking notification groups as read and seen through the
  `onMarkAsSeen` and `onMarkAsRead` handlers.
- The default `Notification` item has
- `onClickUser` handler for `AvatarGroup`

### Fixed

- Calling `onRemoveActivity` on a notification feed now updates the state
  correctly.

## 0.6.23 - 2019-02-05

### Changed

- Improved detection of mentions and hashtags

### Added

- Detection of mentions, hashtags and urls in comments
- Click handlers for mentions and hashtags in comments

## 0.6.22 - 2019-01-31

### SECURITY FIX

- An XSS issue is fixed in this release. Please upgrade! You're affected by the
  issue if you use the default `Activity` and/or the `Video` component.

## 0.6.0 - 2019-12-14

### Breaking Changes

- `onToggleReaction` and `onAddReaction` arguments have changed.

```js
// old
onAddReaction(kind, activity, { data, targetFeeds, trackAnalytics });
// new
onAddReaction(kind, activity, data, { targetFeeds, trackAnalytics });
```

- `session` is replaced with `client` everywhere
- Update `getstream` library to v4.0.7, if you it directly check out it's
  [CHANGELOG](https://github.com/GetStream/stream-js/blob/master/CHANGELOG.md#400---2018-12-03)
  for info on its breaking changes there.

### Changes

- `RepostButton` now actually reposts an activity to another feed.

### Added

- Support for liking of comments. See the
  [`StatusUpdateForm` section of the docs](https://getstream.github.io/react-activity-feed/#!/StatusUpdateForm)
  for an example of this.
