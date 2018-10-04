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

/**
 * Component is described here.
 *
 * @example ./examples/B2BActivity.md
 */
export default class B2BActivity extends React.Component {
  render() {
    return (
      <Panel panelStyle="square">
        <PanelHeading closeButton={false}>
          <Flex vcenter style={{ flex: 1 }}>
            <Avatar rounded size={30} />
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
            <Avatar rounded size={30} />
            <p style={{ fontSize: 12 }}>
              You sent a tracked email to{' '}
              <strong>Cindy Smith (cindy@example.com)</strong>
            </p>
          </Flex>
          <Flex>
            <DataLabel label="status" data="Sent" />
            <DataLabel label="opens" data={1} />
            <DataLabel label="clicks" data={12} />
          </Flex>
        </PanelHeading>
        <PanelContent>
          <Panel panelStyle="square">
            <PanelContent>
              <Title>Subject: Hello</Title>
              <p>Hi Cindy,</p>
              <p>
                I hope I am not bothering you. Could you please refer me to the
                person in charge of [something that is relevant to my product]?
              </p>
              <p>Thanks for your time,</p>
              <p>Tom</p>
            </PanelContent>
          </Panel>
        </PanelContent>
        <PanelFooter>
          <Flex vcenter>
            <Flex vcenter style={{ flex: 1 }}>
              <ReactionToggleIcon
                counts={{ reaction_counts: {} }}
                own_reactions={{ own_reactions: {} }}
                kind="like"
                onPress={() => console.log('hello world')}
                activeIcon="/images/thumb.svg"
                inactiveIcon="/images/thumb-filled.svg"
                labelSingle="like"
                labelPlural="likes"
              />
              <ReactionIcon
                counts={{ reaction_counts: {} }}
                own_reactions={{ own_reactions: {} }}
                kind="comment"
                onPress={() => console.log('hello world')}
                activeIcon="/images/thumb-filled.svg"
                inactiveIcon="/images/thumb.svg"
                icon="/images/comment.svg"
                labelSingle="comment"
                labelPlural="comments"
              />
            </Flex>
            <Flex>
              <Link>Details</Link>
            </Flex>
          </Flex>
        </PanelFooter>
      </Panel>
    );
  }
}
