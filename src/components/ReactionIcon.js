import React from 'react';

import { withTranslationContext } from '../Context';

/**
 * Component is described here.
 *
 * @example ./examples/ReactionIcon.md
 */

class ReactionIcon extends React.Component {
  render() {
    const { counts, kind, height, width, labelSingle, labelPlural, onPress, icon, t } = this.props;
    let count = null;
    if (counts && kind) {
      count = counts[kind] || 0;
    }

    const dimensions = {};
    if (height !== undefined) {
      dimensions.height = height;
    }
    if (width !== undefined) {
      dimensions.width = width;
    }

    if (!count) count = 0;
    let label;

    if (labelSingle && labelPlural) {
      label = count === 1 ? `1 ${labelSingle}` : `${count} ${labelPlural}`;
    }

    if (!labelSingle || !labelPlural) {
      switch (kind) {
        case 'like':
          label = count === 1 ? t('1 like') : t('{{ countLikes }} likes', { countLikes: count });
          break;
        case 'repost':
          label = count === 1 ? t('1 repost') : t('{{ countReposts }} reposts', { countReposts: count });
          break;
        case 'comment':
          label = count === 1 ? t('1 comment') : t('{{ countComments }} comments', { countComments: count });
          break;
        default:
          break;
      }
    }

    return (
      <div className="raf-reaction-icon" onClick={onPress}>
        {icon ? (
          React.isValidElement(icon) ? (
            icon
          ) : (
            <img className="raf-reaction-icon__image" src={icon} alt="" />
          )
        ) : null}

        {count != null ? <p className="raf-reaction-icon__label">{label}</p> : null}
      </div>
    );
  }
}

export default withTranslationContext(ReactionIcon);
