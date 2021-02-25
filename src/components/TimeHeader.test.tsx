import React from 'react';
import renderer from 'react-test-renderer';

import { TimeHeader } from './TimeHeader';

describe('TimeHeader', () => {
  it('renders with default props', () => {
    const tree = renderer
      .create(<TimeHeader>September 2021</TimeHeader>)
      .toJSON();

    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-time-header"
      >
        <div
          className="raf-title"
          style={
            Object {
              "fontSize": 14,
            }
          }
        >
          September 2021
        </div>
        <div
          className="raf-time-header__line"
        />
      </div>
    `);
  });
});
