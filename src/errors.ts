import { FlowRequestTypes } from './types';
import stream from 'getstream';
export const handleError = (
  error: Error,
  type: FlowRequestTypes,
  detail: any,
) => {
  console.warn(error, type, detail);
};

export const getErrorMessage = (
  error: any,
  type: FlowRequestTypes,
  detail: any,
): string => {
  console.warn(error);
  if (!(error instanceof (stream.errors as any).StreamApiError)) {
    return fallbackErrorMessage(error, type, detail);
  }
  const response = error.response;

  if (!response.status || !response.body || !response.body.detail) {
    return fallbackErrorMessage(error, type, detail);
  }
  const status = response.status;
  const text = response.body.detail;

  /* eslint-disable no-magic-numbers */
  if (status >= 400 && status < 600) {
    return text;
  }

  /* eslint-enable no-magic-numbers */

  return fallbackErrorMessage(error, type, detail);
};

export const fallbackErrorMessage = (
  error: Error,
  type: FlowRequestTypes,
  detail: any,
): string => {
  let text = 'Something went wrong';
  let suffix = '';
  switch (type) {
    case 'get-user-info':
      text += ' when loading user info';
      break;
    case 'get-feed':
      text += ' when loading the feed';
      break;
    case 'get-feed-next-page':
      text += ' when loading the next page of the feed';
      break;
    case 'get-notification-counts':
      text += ' when loading your unread notification counts';
      break;
    case 'upload-image':
      text += ' when uploading your image';
      suffix = ' If it is, the image is probably too big';
      break;
    case 'add-activity':
      text += ' when submitting your post';
      break;
    case 'add-reaction':
    case 'add-child-reaction':
      text += ' when submitting your ' + detail.kind;
      break;
    case 'delete-reaction':
    case 'delete-child-reaction':
      text += ' when removing your ' + detail.kind;
      break;
    default:
  }

  text += '. Is your internet working?' + suffix;
  return text;
};
