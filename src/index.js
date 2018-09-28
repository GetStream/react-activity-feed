// @flow
import React, { Component } from 'react';

import './styles.css';
import './App.css';
import './styles/Activity.css';
import './styles/ActivityContent.css';
import './styles/ActivityFooter.css';
import './styles/AttachedActivity.css';
import './styles/Avatar.css';
import './styles/AvatarGroup.css';
import './styles/Button.css';
import './styles/Card.css';
import './styles/CloseButton.css';
import './styles/CommentField.css';
import './styles/CommentItem.css';
import './styles/CommentList.css';
import './styles/Dropdown.css';
import './styles/DropdownPanel.css';
import './styles/EmojiPicker.css';
import './styles/FollowButton.css';
// import './styles/Gallery.css';
import './styles/IconBadge.css';
// import './styles/IconButton.css';
import './styles/Image.css';
import './styles/ImagePreviewer.css';
import './styles/ImageUploadButton.css';
import './styles/LikeButton.css';
import './styles/Link.css';
import './styles/LoadingIndicator.css';
import './styles/NewActivitiesNotification.css';
import './styles/Notification.css';
import './styles/NotificationActions.css';
import './styles/NotificationContent.css';
import './styles/Panel.css';
import './styles/PanelContent.css';
import './styles/PanelFooter.css';
import './styles/PanelHeader.css';
import './styles/ReactionIcon.css';
import './styles/ReactionToggleIcon.css';
import './styles/RepostButton.css';
import './styles/Textarea.css';
import './styles/Thumbnail.css';
import './styles/ThumbnailPlaceholder.css';
import './styles/TimeHeader.css';
import './styles/Timestamp.css';
import './styles/Title.css';
import './styles/UserBar.css';
import './styles/Video.css';

export default class ExampleComponent extends Component<{ text: string }> {
  render() {
    const { text } = this.props;

    return <div>Example Component: {text}</div>;
  }
}
