import * as React from 'react';

import Panel from './Panel';
import PanelHeading from './PanelHeader';
import PanelFooter from './PanelFooter';
import PanelContent from './PanelContent';
import Textarea from './Textarea';
import Avatar from './Avatar';
import EmojiPicker from './EmojiPicker';
import ImageUploadButton from './ImageUploadButton';
import Button from './Button';

/**
 * Component is described here.
 *
 * @example ./examples/StatusUpdateForm.md
 */

export default class StatusUpdateForm extends React.Component {
  render() {
    return (
      <Panel>
        <PanelHeading>New Post</PanelHeading>
        <PanelContent>
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '16px' }}>
              <Avatar size={50} circle />
            </div>
            <Textarea placeholder="Type your worthless opinion... " />
          </div>
        </PanelContent>
        <PanelFooter>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
              <div style={{ marginRight: '32px', display: 'inline-block' }}>
                <ImageUploadButton />
              </div>
              <EmojiPicker />
            </div>
            <Button buttonStyle="primary">Post</Button>
          </div>
        </PanelFooter>
      </Panel>
    );
  }
}
