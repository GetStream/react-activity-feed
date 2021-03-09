import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, screen } from '@testing-library/react';
import { NewActivitiesNotification } from './NewActivitiesNotification';

// TODO: add LabelFunction type and remove directive
// @ts-expect-error
const customLabelFunction = ({ count, labelSingle, labelPlural }) =>
  `You have ${count} unread ${count > 1 ? labelPlural : labelSingle}.`;

describe('NewActivitiesNotification', () => {
  it('renders with no props', () => {
    const tree = renderer.create(<NewActivitiesNotification />).toJSON();
    expect(tree).toMatchInlineSnapshot(`null`);
  });

  it('renders with only adds and deletes specified', () => {
    const tree = renderer.create(<NewActivitiesNotification adds={['1', '2']} deletes={['1', '2']} />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <button
        className="raf-new-activities-notification"
        type="button"
      >
        <a
          className="raf-link"
        >
          You have {{ notificationCount }} new notifications
        </a>
      </button>
    `);
  });

  it('renders with adds, deletes and labels (plural/singular) specified', () => {
    const tree = renderer
      .create(
        <NewActivitiesNotification
          adds={['1', '2']}
          deletes={['1', '2']}
          labelSingle="notification"
          labelPlural="notifications"
        />,
      )
      .toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <button
        className="raf-new-activities-notification"
        type="button"
      >
        <a
          className="raf-link"
        >
          You have 2 new notifications
        </a>
      </button>
    `);
  });

  it('renders with custom labelFunction specified', () => {
    const tree = renderer
      .create(
        <NewActivitiesNotification
          adds={['1', '2']}
          deletes={['1', '2']}
          labelSingle="message"
          labelPlural="messages"
          labelFunction={customLabelFunction}
        />,
      )
      .toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <button
        className="raf-new-activities-notification"
        type="button"
      >
        <a
          className="raf-link"
        >
          You have 4 unread messages.
        </a>
      </button>
    `);
  });

  it('checks if onClick has been called', () => {
    const onClick = jest.fn();

    render(
      <NewActivitiesNotification
        adds={['1', '2']}
        deletes={['1', '2']}
        labelSingle="notification"
        labelPlural="notifications"
        onClick={onClick}
      />,
    );

    fireEvent.click(screen.getByText('You have 2 new notifications'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
