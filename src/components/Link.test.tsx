import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, screen } from '@testing-library/react';

import { Link } from './Link';

const testURL = 'https://getstream.io/activity-feeds';
const testText = 'Activity Feeds';

describe('Link', () => {
  it('renders with custom props', () => {
    const tree = renderer.create(
      <Link to={testURL} onClick={console.log}>
        {testText}
      </Link>,
    );

    expect(tree).toMatchInlineSnapshot(`
      <a
        className="raf-link"
        href="https://getstream.io/activity-feeds"
        onClick={[Function]}
      >
        Activity Feeds
      </a>
    `);
  });

  it('checks if onClick has been called', () => {
    const handleClick = jest.fn();

    render(
      <Link to={testURL} onClick={handleClick}>
        {testText}
      </Link>,
    );

    fireEvent.click(screen.getByText(testText));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
