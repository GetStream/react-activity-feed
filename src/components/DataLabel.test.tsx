import React from 'react';
import renderer from 'react-test-renderer';

import { DataLabel } from './DataLabel';

describe('DataLabel', () => {
  it('renders with default props', () => {
    const tree = renderer.create(<DataLabel />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-data-label"
      >
        <span
          className="raf-data-label__label"
        >
          label
        </span>
        <span
          className="raf-data-label__data"
        >
          data
        </span>
      </div>
    `);
  });

  it('renders with custom props', () => {
    const tree = renderer.create(<DataLabel label="age" data="26" />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-data-label"
      >
        <span
          className="raf-data-label__label"
        >
          age
        </span>
        <span
          className="raf-data-label__data"
        >
          26
        </span>
      </div>
    `);
  });
});
