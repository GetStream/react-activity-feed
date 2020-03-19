//@flow
import * as React from 'react';

import Button from './Button';

import { withTranslationContext } from '../Context';

type Props = {|
  onClick: () => mixed,
  refreshing: boolean,
  children: React.Node,
|};

class LoadMoreButton extends React.Component<Props> {
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
