import React from 'react';
import renderer from 'react-test-renderer';
import { LoadMorePaginator } from './LoadMorePaginator';

jest.mock('./LoadMoreButton', () => ({
  LoadMoreButton: jest.fn(({ refreshing, loadNextPage }) => (
    <div data-refreshing={refreshing} data-onclick={loadNextPage} />
  )),
}));

const loadNextPage = () => {};

describe('LoadMorePaginator', () => {
  it('renders the button', () => {
    const tree = renderer
      .create(
        <LoadMorePaginator hasNextPage loadNextPage={loadNextPage}>
          children
        </LoadMorePaginator>,
      )
      .toJSON();
    expect(tree).toMatchInlineSnapshot(`
      Array [
        "children",
        <div />,
      ]
    `);
  });

  it('renders in reverse mode', () => {
    const tree = renderer
      .create(
        <LoadMorePaginator hasNextPage reverse loadNextPage={loadNextPage}>
          children
        </LoadMorePaginator>,
      )
      .toJSON();
    expect(tree).toMatchInlineSnapshot(`
      Array [
        <div />,
        "children",
      ]
    `);
  });

  it('pass down props to LoadMoreButton', () => {
    const tree = renderer
      .create(
        <LoadMorePaginator hasNextPage loadNextPage={loadNextPage} refreshing>
          children
        </LoadMorePaginator>,
      )
      .toJSON();
    expect(tree).toMatchInlineSnapshot(`
      Array [
        "children",
        <div
          data-refreshing={true}
        />,
      ]
    `);
  });
});
