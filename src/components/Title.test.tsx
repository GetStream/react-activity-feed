import React from 'react';
import renderer from 'react-test-renderer';

import { Title } from './Title';

describe('Title', () => {
  it('renders with default props', () => {
    const tree = renderer.create(<Title>title</Title>).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-title"
        style={
          Object {
            "fontSize": 18,
          }
        }
      >
        title
      </div>
    `);
  });

  it('renders with custom props', () => {
    const tree = renderer.create(<Title size={20}>title</Title>).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-title"
        style={
          Object {
            "fontSize": 20,
          }
        }
      >
        title
      </div>
    `);
  });
});
