import React from 'react';
import renderer from 'react-test-renderer';

import { FeedPlaceholder } from './FeedPlaceholder';

describe('FeedPlaceholder', () => {
  it('renders with default props', () => {
    const tree = renderer.create(<FeedPlaceholder />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-feed-placeholder"
      >
        <p>
          No data to display...
        </p>
      </div>
    `);
  });

  it('renders with custom props', () => {
    const tree = renderer.create(<FeedPlaceholder text="Random text" />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-feed-placeholder"
      >
        <p>
          Random text
        </p>
      </div>
    `);
  });
});
