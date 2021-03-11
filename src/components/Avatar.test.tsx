import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';

import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders with default props', () => {
    const tree = renderer.create(<Avatar />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <svg
        className="raf-avatar  "
        enableBackground="new 312.809 0 401 401"
        style={Object {}}
        version="1.1"
        viewBox="312.809 0 401 401"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          transform="matrix(1.223 0 0 1.223 -467.5 -843.44)"
        >
          <rect
            fill="#E4E6E7"
            height="401"
            width="401"
            x="601.45"
            y="653.07"
          />
          <path
            d="m802.38 908.08c-84.515 0-153.52 48.185-157.38 108.62h314.79c-3.87-60.44-72.9-108.62-157.41-108.62z"
            fill="#AEB4B7"
          />
          <path
            d="m881.37 818.86c0 46.746-35.106 84.641-78.41 84.641s-78.41-37.895-78.41-84.641 35.106-84.641 78.41-84.641c43.31 0 78.41 37.9 78.41 84.64z"
            fill="#AEB4B7"
          />
        </g>
      </svg>
    `);
  });

  it('renders with custom props', () => {
    const tree = renderer
      .create(
        <Avatar
          image="https://randomuser.me/api/portraits/men/1.jpg"
          size={50}
          alt="avatar"
          rounded
          circle
          onClick={console.log}
        />,
      )
      .toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <img
        alt="avatar"
        className="raf-avatar raf-avatar--rounded raf-avatar--circle"
        onClick={[Function]}
        src="https://randomuser.me/api/portraits/men/1.jpg"
        style={
          Object {
            "height": "50px",
            "width": "50px",
          }
        }
      />
    `);
  });

  it('checks if onClick has been called', () => {
    const handleClick = jest.fn();

    const { getByAltText } = render(
      <Avatar alt="avatar" image="https://randomuser.me/api/portraits/men/1.jpg" onClick={handleClick} />,
    );

    fireEvent.click(getByAltText('avatar'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
