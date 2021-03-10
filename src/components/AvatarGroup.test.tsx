import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
// import { UserAPIResponse } from 'getstream';

import { AvatarGroup } from './AvatarGroup';

const users = [
  {
    data: {
      name: 'Jaap Bakker',
      profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
  },
  {
    data: {
      name: 'Sloan Humfrey',
      profileImage: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
  },
  {
    data: {
      name: 'James Dean',
      profileImage: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
  },
];

describe('AvatarGroup', () => {
  it('renders with default props', () => {
    const tree = renderer.create(<AvatarGroup users={users} />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-avatar-group"
      >
        <div
          className="raf-avatar-group__avatar"
        >
          <img
            alt=""
            className="raf-avatar  raf-avatar--circle"
            src="https://randomuser.me/api/portraits/men/1.jpg"
            style={
              Object {
                "height": "30px",
                "width": "30px",
              }
            }
          />
        </div>
        <div
          className="raf-avatar-group__avatar"
        >
          <img
            alt=""
            className="raf-avatar  raf-avatar--circle"
            src="https://randomuser.me/api/portraits/women/1.jpg"
            style={
              Object {
                "height": "30px",
                "width": "30px",
              }
            }
          />
        </div>
        <div
          className="raf-avatar-group__avatar"
        >
          <img
            alt=""
            className="raf-avatar  raf-avatar--circle"
            src="https://randomuser.me/api/portraits/men/3.jpg"
            style={
              Object {
                "height": "30px",
                "width": "30px",
              }
            }
          />
        </div>
      </div>
    `);
  });

  it('renders with custom props', () => {
    const tree = renderer
      .create(<AvatarGroup users={users} limit={2} avatarSize={50} onClickUser={console.log} />)
      .toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-avatar-group"
      >
        <div
          className="raf-avatar-group__avatar"
        >
          <img
            alt=""
            className="raf-avatar  raf-avatar--circle"
            onClick={[Function]}
            src="https://randomuser.me/api/portraits/men/1.jpg"
            style={
              Object {
                "height": "50px",
                "width": "50px",
              }
            }
          />
        </div>
        <div
          className="raf-avatar-group__avatar"
        >
          <img
            alt=""
            className="raf-avatar  raf-avatar--circle"
            onClick={[Function]}
            src="https://randomuser.me/api/portraits/women/1.jpg"
            style={
              Object {
                "height": "50px",
                "width": "50px",
              }
            }
          />
        </div>
      </div>
    `);
  });

  it('checks if onClick has been called', () => {
    const handleClick = jest.fn();

    const { getByAltText } = render(<AvatarGroup users={users} limit={1} onClickUser={handleClick} />);

    fireEvent.click(getByAltText(''));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
