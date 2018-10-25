// @flow
import * as React from 'react';
import Panel from './Panel';
import PanelContent from './PanelContent';
import Flex from './Flex';
import DataLabel from './DataLabel';
import Avatar from './Avatar';
import Title from './Title';
import ReactionToggleIcon from './ReactionToggleIcon';
import ReactionIcon from './ReactionIcon';
import Link from './Link';
import type { Renderable } from '../types';
import { smartRender } from '../utils';
import moment from 'moment';

import ThumbUp from '../assets/images/thumb.svg';
import ThumbUpFilled from '../assets/images/thumb-filled.svg';
import Comment from '../assets/images/comment.svg';

export type Props = {|
  Header: Renderable,
  Content: Renderable,
  Footer: Renderable,
  activity: any,
  onToggleReaction: any,
|};

type State = {|
  showComments: boolean,
|};

/**
 * Component is described here.
 *
 * @example ./examples/B2BActivity.md
 */
export default class B2BActivity extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showComments: false,
    };
  }

  renderHeader = () => {
    const { activity } = this.props;
    return (
      <Flex
        a="center"
        w="wrap"
        j="space-between"
        style={{ padding: '8px 16px' }}
      >
        <Flex style={{ width: '100%' }}>
          <p
            style={{
              fontSize: 14,
              fontWeight: 900,
              textTransform: 'uppercase',
              opacity: 0.5,
              margin: '4px 0',
            }}
          >
            {moment(activity.timestamp).format('MMMM DD LT')}
          </p>
        </Flex>
        <Flex a="center" style={{ margin: 0 }}>
          {activity.object.type === 'tracked email' && (
            <Avatar
              image={
                activity.actor && activity.actor.profileImage
                  ? activity.actor.profileImage
                  : ''
              }
              rounded
              size={30}
            />
          )}

          {activity.object.type === 'changed' && (
            <Flex a="center">
              <Avatar rounded image={activity.actor.profileImage} size={30} />
              <p style={{ fontSize: 12 }}>
                <strong>{activity.actor.name}</strong> {activity.verb} to{' '}
                <strong>{`"${activity.actor.lifecycle}"`}</strong>
              </p>
            </Flex>
          )}

          {activity.object.type === 'added' && (
            <Flex a="center">
              <Avatar rounded image={activity.actor.profileImage} size={30} />
              <p style={{ fontSize: 12 }}>
                <strong>{activity.actor.name}</strong> was {activity.verb} from{' '}
                <strong>{activity.object.source}</strong>
              </p>
            </Flex>
          )}

          {activity.object.type === 'tracked email' && (
            <p style={{ fontSize: 12 }}>
              You sent a tracked email to <strong>{activity.actor.name}</strong>{' '}
              <em>({activity.actor.email})</em>
            </p>
          )}
        </Flex>

        {activity.object.type === 'tracked email' ? (
          <Flex>
            <DataLabel label="status" data={activity.object.status} />
            <DataLabel label="opens" data={activity.object.opens} />
            <DataLabel label="clicks" data={activity.object.clicks} />
          </Flex>
        ) : null}
      </Flex>
    );
  };

  renderContent = () => {
    const { activity } = this.props;
    if (activity.object && activity.object.type === 'tracked email') {
      return (
        <Flex js="stretch" style={{ padding: '8px 16px' }}>
          <Panel panelStyle="square">
            <PanelContent>
              <Title>Subject: {activity.object.subject}</Title>
              {activity.object.content}
            </PanelContent>
          </Panel>
        </Flex>
      );
    }
    return null;
  };

  renderFooter = () => {
    const { activity } = this.props;
    return (
      <React.Fragment>
        <Flex
          a="center"
          j="space-between"
          w="wrap"
          style={{ padding: '0 16px 0px' }}
        >
          <Flex a="center" style={{ flex: 1 }}>
            <ReactionToggleIcon
              counts={activity.reaction_counts}
              own_reactions={activity.own_reactions}
              kind="like"
              onPress={() => this.props.onToggleReaction('like', activity, {})}
              activeIcon={ThumbUpFilled}
              inactiveIcon={ThumbUp}
              labelSingle="like"
              labelPlural="likes"
            />
            <ReactionIcon
              counts={activity.reaction_counts}
              kind="comment"
              own_reactions={{}}
              onPress={() => this.setState({ showComments: true })}
              icon={Comment}
              activeIcon={Comment}
              inactiveIcon={Comment}
              labelSingle="comment"
              labelPlural="comments"
            />
          </Flex>
          {this.state.showComments && (
            <Flex>
              <Link>Details</Link>
            </Flex>
          )}
        </Flex>
      </React.Fragment>
    );
  };

  render() {
    return (
      <Panel panelStyle="square">
        <React.Fragment>
          {smartRender(this.props.Header, {}, this.renderHeader)}
          {smartRender(this.props.Content, {}, this.renderContent)}
          {smartRender(this.props.Footer, {}, this.renderFooter)}
        </React.Fragment>
      </Panel>
    );
  }
}
