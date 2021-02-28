import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { FollowButton } from './FollowButton';

describe('FollowButton', () => {
  it('renders with default props', () => {
    const tree = renderer
      .create(<FollowButton followed onClick={console.log} />)
      .toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-follow-button raf-follow-button--active"
        onClick={[Function]}
        role="button"
      >
        Following
      </div>
    `);
  });

  it('checks if onClick has been called', () => {
    const onClick = jest.fn();

    render(<FollowButton onClick={onClick} />);

    fireEvent.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders same after "followed" prop change', () => {
    const { rerender } = render(<FollowButton followed={false} />);

    expect(screen.getByRole('button')).toHaveTextContent('Follow');

    rerender(<FollowButton followed />);

    expect(screen.getByRole('button')).toHaveTextContent('Follow');
  });
});
