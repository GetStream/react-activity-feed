import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, screen } from '@testing-library/react';
import { LoadMoreButton } from './LoadMoreButton';

describe('LoadMoreButton', () => {
  it('renders with default props', () => {
    const tree = renderer.create(<LoadMoreButton />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-load-more-button"
      >
        <button
          className="raf-button raf-button--info"
          disabled={false}
          type="button"
        >
          Load more
        </button>
      </div>
    `);
  });

  it('renders with custom props', () => {
    const tree = renderer.create(<LoadMoreButton loading disabled />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-load-more-button"
      >
        <button
          className="raf-button raf-button--info"
          disabled={false}
          type="button"
        >
          Load more
        </button>
      </div>
    `);
  });

  it('checks if onClick has been called', () => {
    const onClick = jest.fn();

    render(<LoadMoreButton onClick={onClick}>Click</LoadMoreButton>);

    fireEvent.click(screen.getByText('Click'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  // eslint-disable-next-line jest/no-commented-out-tests
  //   it('checks if disabled attribute works for click event', () => {
  //     const handleClick = jest.fn();

  //     render(
  //       <LoadMoreButton disabled onClick={handleClick}>
  //         Click
  //       </LoadMoreButton>,
  //     );

  //     fireEvent.click(screen.getByText('Click'));

  //     expect(handleClick).toHaveBeenCalledTimes(0);
  //   });
});
