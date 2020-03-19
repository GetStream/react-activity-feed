// @flow
import React from 'react';
import { withTranslationContext } from '../Context';

type Props = {|
  text: string,
|};
class FeedPlaceholder extends React.Component<Props> {
  render() {
    const { t, text } = this.props;
    return (
      <div className="raf-feed-placeholder">
        <p>{text || t('No data to display...')}</p>
      </div>
    );
  }
}

export default withTranslationContext(FeedPlaceholder);
