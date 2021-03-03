import { StreamApiError } from 'getstream';

type ErrorDetail = { kind?: string };

export const handleError = (error: Error, type: string, detail: ErrorDetail) => {
  console.warn(error, type, detail);
};

export const getErrorMessage = (error: Error | StreamApiError, type: string, detail: ErrorDetail) => {
  console.warn(error);

  if (!(error instanceof StreamApiError)) {
    return fallbackErrorMessage(error, type, detail);
  }

  const response = error.response;

  if (!response.status || !response.data || !response.data.detail) {
    return fallbackErrorMessage(error, type, detail);
  }
  const status = response.status;
  const text = response.data.detail;

  if (status >= 400 && status < 600) {
    return text;
  }

  return fallbackErrorMessage(error, type, detail);
};

export const fallbackErrorMessage = (_error: Error | StreamApiError, type: string, detail: ErrorDetail) => {
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

  return `${text}. Is your internet working?${suffix}`;
};
