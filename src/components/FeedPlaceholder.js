import React from 'react';
import { withTranslationContext } from '../Context';

class FeedPlaceholder extends React.Component {
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
