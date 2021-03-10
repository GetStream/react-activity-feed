import React from 'react';
import renderer from 'react-test-renderer';
import { smartRender } from './';

const Component = (props) => <div {...props}></div>;

class ClassComponent extends React.Component {
  render() {
    return <div {...this.props}></div>;
  }
}

describe('smartRender', () => {
  it('is renders basic elements', () => {
    expect(renderer.create(<>{smartRender('hello')}</>).toJSON()).toMatchInlineSnapshot(`"hello"`);
    expect(renderer.create(<>{smartRender(123)}</>).toJSON()).toMatchInlineSnapshot(`"123"`);
    expect(renderer.create(<>{smartRender(true)}</>).toJSON()).toMatchInlineSnapshot(`null`);
    expect(renderer.create(<>{smartRender(false)}</>).toJSON()).toMatchInlineSnapshot(`null`);
    expect(renderer.create(<>{smartRender(null)}</>).toJSON()).toMatchInlineSnapshot(`null`);
  });

  it('is renders basic elements as fallback', () => {
    expect(renderer.create(<>{smartRender(undefined, {}, 'hello')}</>).toJSON()).toMatchInlineSnapshot(`"hello"`);
    expect(renderer.create(<>{smartRender(undefined, {}, 123)}</>).toJSON()).toMatchInlineSnapshot(`"123"`);
    expect(renderer.create(<>{smartRender(undefined, {}, true)}</>).toJSON()).toMatchInlineSnapshot(`null`);
    expect(renderer.create(<>{smartRender(undefined, {}, false)}</>).toJSON()).toMatchInlineSnapshot(`null`);
    expect(renderer.create(<>{smartRender(undefined, {}, null)}</>).toJSON()).toMatchInlineSnapshot(`null`);
  });

  it('is renders basic elements with props', () => {
    expect(renderer.create(<>{smartRender('hello', { prop: 'prop' })}</>).toJSON()).toMatchInlineSnapshot(`"hello"`);
    expect(renderer.create(<>{smartRender(123, { prop: 'prop' })}</>).toJSON()).toMatchInlineSnapshot(`"123"`);
    expect(renderer.create(<>{smartRender(undefined, { prop: 'prop' }, 'h')}</>).toJSON()).toMatchInlineSnapshot(`"h"`);
    expect(renderer.create(<>{smartRender(undefined, { prop: 'prop' }, 1)}</>).toJSON()).toMatchInlineSnapshot(`"1"`);
  });

  it('is renders React elements', () => {
    expect(renderer.create(<>{smartRender(<Component />)}</>).toJSON()).toMatchInlineSnapshot(`<div />`);
    expect(renderer.create(<>{smartRender(Component)}</>).toJSON()).toMatchInlineSnapshot(`<div />`);
    expect(renderer.create(<>{smartRender(<ClassComponent />)}</>).toJSON()).toMatchInlineSnapshot(`<div />`);
    expect(renderer.create(<>{smartRender(ClassComponent)}</>).toJSON()).toMatchInlineSnapshot(`<div />`);
  });

  it('is renders React elements with props', () => {
    expect(renderer.create(<>{smartRender(<Component />, { h: 'h' })}</>).toJSON()).toMatchInlineSnapshot(`<div />`);
    expect(renderer.create(<>{smartRender(<ClassComponent />, { h: 'h' })}</>).toJSON()).toMatchInlineSnapshot(
      `<div />`,
    );

    expect(renderer.create(<>{smartRender(<Component h="h" />)}</>).toJSON()).toMatchInlineSnapshot(`
      <div
        h="h"
      />
    `);
    expect(renderer.create(<>{smartRender(Component, { h: 'h' })}</>).toJSON()).toMatchInlineSnapshot(`
      <div
        h="h"
      />
    `);
    expect(renderer.create(<>{smartRender(<ClassComponent h="h" />)}</>).toJSON()).toMatchInlineSnapshot(`
      <div
        h="h"
      />
    `);
    expect(renderer.create(<>{smartRender(ClassComponent, { h: 'h' })}</>).toJSON()).toMatchInlineSnapshot(`
      <div
        h="h"
      />
    `);
  });

  it('is renders fallback elements', () => {
    expect(renderer.create(<>{smartRender(undefined, {}, <Component />)}</>).toJSON()).toMatchInlineSnapshot(`<div />`);
    expect(renderer.create(<>{smartRender(undefined, {}, Component)}</>).toJSON()).toMatchInlineSnapshot(`<div />`);
  });

  it('is renders fallback elements with props', () => {
    expect(renderer.create(<>{smartRender(undefined, {}, <Component h="h" />)}</>).toJSON()).toMatchInlineSnapshot(`
      <div
        h="h"
      />
    `);
    expect(renderer.create(<>{smartRender(undefined, { h: 'h' }, Component)}</>).toJSON()).toMatchInlineSnapshot(`
      <div
        h="h"
      />
    `);
  });
});
