import React from 'react';
import renderer from 'react-test-renderer';

import { Flex } from './Flex';

describe('Flex', () => {
  it('renders with default props', () => {
    const tree = renderer
      .create(
        <Flex>
          <div>1</div>
          <div>2</div>
        </Flex>,
      )
      .toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-flex"
        style={
          Object {
            "alignItems": undefined,
            "flexDirection": "row",
            "flexWrap": "nowrap",
            "justifyContent": undefined,
            "justifySelf": undefined,
          }
        }
      >
        <div>
          1
        </div>
        <div>
          2
        </div>
      </div>
    `);
  });

  it('renders with custom props', () => {
    const tree = renderer
      .create(
        <Flex d="column" a="center" style={{ backgroundColor: 'lightblue' }}>
          <div>1</div>
          <div>2</div>
        </Flex>,
      )
      .toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-flex"
        style={
          Object {
            "alignItems": "center",
            "backgroundColor": "lightblue",
            "flexDirection": "column",
            "flexWrap": "nowrap",
            "justifyContent": undefined,
            "justifySelf": undefined,
          }
        }
      >
        <div>
          1
        </div>
        <div>
          2
        </div>
      </div>
    `);
  });
});
