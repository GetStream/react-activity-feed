# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

Nothing yet

## 0.7.1

### Added

- Support reading comments from oldest to newest
- Support for displaying comments in revered order, i.e. the load more button at
  the top.

## 0.7.0

### Breaking changes

- `AvatarGroup` now takes a list of `UserResponse` in it's `user` argument
  instead of a list of `UserData`.

### Added

- Support marking notification groups as read and seen through the
  `onMarkAsSeen` and `onMarkAsRead` handlers.
- The default `Notification` item has
- `onClickUser` handler for `AvatarGroup`
- `onClickUser` handler for `Notification` is now forwarded to the embedded
  `AvatarGroup` as well.

### Fixed

- Calling `onRemoveActivity` on a notification feed now updates the state
  correctly.

## 0.6.23

### Changed

- Improved detection of mentions and hashtags

### Added

- Detection of mentions, hashtags and urls in comments
- Click handlers for mentions and hashtags in comments

## 0.6.22

### SECURITY FIX

- An XSS issue is fixed in this release. Please upgrade! You're affected by the
  issue if you use the default `Activity` and/or the `Video` component.

## 0.6.0

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
