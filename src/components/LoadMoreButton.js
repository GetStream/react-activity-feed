import React from 'react';

import { Button } from './Button';

import { withTranslationContext } from '../Context';

class LoadMoreButton extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <div className="raf-load-more-button">
        <Button
          onClick={this.props.onClick}
          buttonStyle="info"
          disabled={this.props.refreshing}
          loading={this.props.refreshing}
        >
          {this.props.children ? this.props.children : t('Load more')}
        </Button>
      </div>
    );
  }
}

export default withTranslationContext(LoadMoreButton);
