// @flow

import * as React from 'react';
import Panel from './Panel';
import PanelHeading from './PanelHeader';
import PanelContent from './PanelContent';
import PanelFooter from './PanelFooter';
import Flex from './Flex';
import DataLabel from './DataLabel';
import Avatar from './Avatar';
import Title from './Title';
import ReactionToggleIcon from './ReactionToggleIcon';
import ReactionIcon from './ReactionIcon';
import Link from './Link';
import type { Renderable } from '../types';
import { smartRender } from '../utils';

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

/**
 * Component is described here.
 *
 * @example ./examples/B2BActivity.md
 */
export default class B2BActivity extends React.Component<Props> {
  renderHeader = () => {
    const { activity } = this.props;
    return (
      <PanelHeading closeButton={false}>
        <Flex vcenter style={{ flex: 1 }}>
          <Avatar rounded size={30} />
          {activity.object.type === 'email' && (
            <React.Fragment>
              <svg
                width="19"
                height="8"
                viewBox="0 0 19 8"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 4l-4-4v3H0v2h15v3z"
                  fill="#02D4B1"
                  fillRule="evenodd"
                />
              </svg>
              <Avatar
                rounded
                image={activity.object.actor.profileImage}
                size={30}
              />
            </React.Fragment>
          )}

          {activity.object.type === 'email' && (
            <p style={{ fontSize: 12 }}>
              You sent a tracked email to{' '}
              <strong>{activity.object.actor.name}</strong>{' '}
              <em>({activity.object.actor.email})</em>
            </p>
          )}
        </Flex>

        {activity.object.type === 'email' ? (
          <Flex>
            <DataLabel label="status" data={activity.object.status} />
            <DataLabel label="opens" data={activity.object.opens} />
            <DataLabel label="clicks" data={activity.object.clicks} />
          </Flex>
        ) : null}
      </PanelHeading>
    );
  };

  renderContent = () => {
    const { activity } = this.props;
    if (activity.object && activity.object.type === 'email') {
      return (
        <PanelContent>
          <Panel panelStyle="square">
            <PanelContent>
              <Title>Subject: {activity.object.subject}</Title>
              {activity.object.content}
            </PanelContent>
          </Panel>
        </PanelContent>
      );
    }
    return null;
  };

  renderFooter = () => {
    const { activity } = this.props;
    return (
      <PanelFooter>
        <Flex vcenter>
          <Flex vcenter style={{ flex: 1 }}>
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
              onPress={() => this.props.onToggleReaction('like', activity, {})}
              icon={Comment}
              activeIcon={Comment}
              inactiveIcon={Comment}
              labelSingle="comment"
              labelPlural="comments"
            />
          </Flex>
          <Flex>
            <Link>Details</Link>
          </Flex>
        </Flex>
      </PanelFooter>
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
