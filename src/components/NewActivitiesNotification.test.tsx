import React from 'react';
import renderer from 'react-test-renderer';
import { NewActivitiesNotification } from './NewActivitiesNotification';
import { StreamApp } from '../Context/StreamApp';

// @ts-expect-error
const customLabelFunction = ({ count, labelSingle, labelPlural }) =>
  `You have ${count} unread ${count > 1 ? labelPlural : labelSingle}.`;

describe('NewActivitiesNotification', () => {
  it('renders with no props', () => {
    const tree = renderer
      .create(
        <StreamApp
          apiKey="sesb46h7zb6p"
          appId="66001"
          token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmF0bWFuIn0.8aYd7O_fx-1YMx28DXG1n274o4pa3SjHnRM8AIHLqkE"
        >
          <NewActivitiesNotification />
        </StreamApp>,
      )
      .toJSON();
    expect(tree).toMatchInlineSnapshot(`null`);
  });

  it('renders with only adds and deletes specified', () => {
    const tree = renderer
      .create(
        <StreamApp
          apiKey="sesb46h7zb6p"
          appId="66001"
          token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmF0bWFuIn0.8aYd7O_fx-1YMx28DXG1n274o4pa3SjHnRM8AIHLqkE"
        >
          <NewActivitiesNotification adds={['1', '2']} deletes={['1', '2']} />
        </StreamApp>,
      )
      .toJSON();
    expect(tree).toMatchInlineSnapshot(`null`);
  });

  it('renders with adds, deletes and labels (plural/singular) specified', () => {
    const tree = renderer
      .create(
        <StreamApp
          apiKey="sesb46h7zb6p"
          appId="66001"
          token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmF0bWFuIn0.8aYd7O_fx-1YMx28DXG1n274o4pa3SjHnRM8AIHLqkE"
        >
          <NewActivitiesNotification
            adds={['1', '2']}
            deletes={['1', '2']}
            labelSingle="notification"
            labelPlural="notifications"
          />
        </StreamApp>,
      )
      .toJSON();
    expect(tree).toMatchInlineSnapshot(`null`);
  });

  it('renders with custom labelFunction specified', () => {
    const tree = renderer
      .create(
        <StreamApp
          apiKey="sesb46h7zb6p"
          appId="66001"
          token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmF0bWFuIn0.8aYd7O_fx-1YMx28DXG1n274o4pa3SjHnRM8AIHLqkE"
        >
          <NewActivitiesNotification
            adds={['1', '2']}
            deletes={['1', '2']}
            labelSingle="message"
            labelPlural="messages"
            labelFunction={customLabelFunction}
          />
        </StreamApp>,
      )
      .toJSON();
    expect(tree).toMatchInlineSnapshot(`null`);
  });
});
