// @flow
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileWord,
  faFileExcel,
  faFileArchive,
  faFileAudio,
  faFileVideo,
  faFileImage,
  faFileAlt,
} from '@fortawesome/free-regular-svg-icons';

export type Props = {|
  mimeType: string,
|};

// Partially based on:
// https://stackoverflow.com/a/4212908/2570866

const wordMimeTypes = [
  // Microsoft Word
  // .doc .dot
  'application/msword',
  // .doc .dot
  'application/msword-template',
  // .docx
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  // .dotx (no test)
  'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
  // .docm
  'application/vnd.ms-word.document.macroEnabled.12',
  // .dotm (no test)
  'application/vnd.ms-word.template.macroEnabled.12',

  // LibreOffice/OpenOffice Writer
  // .odt
  'application/vnd.oasis.opendocument.text',
  // .ott
  'application/vnd.oasis.opendocument.text-template',
  // .fodt
  'application/vnd.oasis.opendocument.text-flat-xml',
  // .uot
  // NOTE: firefox doesn't know mimetype so maybe ignore
];

const excelMimeTypes = [
  // .csv
  'text/csv',
  // TODO: maybe more data files

  // Microsoft Excel
  // .xls .xlt .xla (no test for .xla)
  'application/vnd.ms-excel',
  // .xlsx
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  // .xltx (no test)
  'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
  // .xlsm
  'application/vnd.ms-excel.sheet.macroEnabled.12',
  // .xltm (no test)
  'application/vnd.ms-excel.template.macroEnabled.12',
  // .xlam (no test)
  'application/vnd.ms-excel.addin.macroEnabled.12',
  // .xlsb (no test)
  'application/vnd.ms-excel.addin.macroEnabled.12',

  // LibreOffice/OpenOffice Calc
  // .ods
  'application/vnd.oasis.opendocument.spreadsheet',
  // .ots
  'application/vnd.oasis.opendocument.spreadsheet-template',
  // .fods
  'application/vnd.oasis.opendocument.spreadsheet-flat-xml',
  // .uos
  // NOTE: firefox doesn't know mimetype so maybe ignore
];

const archiveFileTypes = [
  // .zip
  'application/zip',
  // .z7
  'application/x-7z-compressed',
  // .ar
  'application/x-archive',
  // .tar
  'application/x-tar',
  // .tar.gz
  'application/gzip',
  // .tar.Z
  'application/x-compress',
  // .tar.bz2
  'application/x-bzip',
  // .tar.lz
  'application/x-lzip',
  // .tar.lz4
  'application/x-lz4',
  // .tar.lzma
  'application/x-lzma',
  // .tar.lzo (no test)
  'application/x-lzop',
  // .tar.xz
  'application/x-xz',
  // .war
  'application/x-webarchive',
];

const mimeTypeToIconMap = {};

for (const type of wordMimeTypes) {
  mimeTypeToIconMap[type] = faFileWord;
}

for (const type of excelMimeTypes) {
  mimeTypeToIconMap[type] = faFileExcel;
}

for (const type of archiveFileTypes) {
  mimeTypeToIconMap[type] = faFileArchive;
}
function mimeTypeToIcon(mimeType: string) {
  const icon = mimeTypeToIconMap[mimeType];
  if (icon) {
    return icon;
  }
  if (mimeType.startsWith('audio/')) {
    return faFileAudio;
  }
  if (mimeType.startsWith('video/')) {
    return faFileVideo;
  }
  if (mimeType.startsWith('image/')) {
    return faFileImage;
  }
  return faFileAlt;
}

/**
 * This is simply a button wrapper, add's a div with `role="button"` and a onClick
 * @example ./examples/IconButton.md
 */
export default class IconButton extends React.Component<Props> {
  render() {
    return <FontAwesomeIcon icon={mimeTypeToIcon(this.props.mimeType)} />;
  }
}
