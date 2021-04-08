import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import moment from 'moment';

import { TranslationProvider } from '../Context/TranslationContext';
import { UserBar } from './UserBar';

// @ts-expect-error
Date.now = jest.fn(() => new Date('2021-04-15T11:34:36.104Z'));

describe('UserBar', () => {
  it('renders with default props', () => {
    const tree = renderer.create(<UserBar username="batman" />);

    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-user-bar"
      >
        <div
          className="raf-user-bar__details"
        >
          <p
            className="raf-user-bar__username"
            data-testid="user-bar-username"
          >
            batman
          </p>
        </div>
        <p
          className="raf-user-bar__extra"
        >
          <time />
        </p>
      </div>
    `);
  });

  it('renders with custom props', () => {
    const tree = renderer.create(
      <TranslationProvider value={{ t: (v: string) => v, tDateTimeParser: moment }}>
        <UserBar
          username="Batman"
          onClickUser={console.log}
          avatar="https://i.pinimg.com/originals/4f/a1/41/4fa141173a1b04470bb2f850bc5da13b.png"
          AfterUsername={<label>Gotham City</label>}
          icon="https://pics.freeicons.io/uploads/icons/png/4781616661579237635-24.png"
          timestamp="2021-04-08T10:52:02.250Z"
          subtitle="The Dark Knight Rises"
        />
      </TranslationProvider>,
    );

    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-user-bar"
      >
        <img
          alt=""
          className="raf-avatar  raf-avatar--circle"
          onClick={[Function]}
          src="https://i.pinimg.com/originals/4f/a1/41/4fa141173a1b04470bb2f850bc5da13b.png"
          style={
            Object {
              "height": "50px",
              "width": "50px",
            }
          }
        />
        <div
          className="raf-user-bar__details"
        >
          <p
            className="raf-user-bar__username"
            data-testid="user-bar-username"
            onClick={[Function]}
          >
            Batman
          </p>
          <label>
            Gotham City
          </label>
          <img
            alt="icon"
            src="https://pics.freeicons.io/uploads/icons/png/4781616661579237635-24.png"
          />
          <p
            className="raf-user-bar__subtitle"
          >
            <time
              dateTime="2021-04-08T10:52:02.250Z"
              title="2021-04-08T10:52:02.250Z"
            >
              The Dark Knight Rises
            </time>
          </p>
        </div>
        <p
          className="raf-user-bar__extra"
        >
          <time
            dateTime="2021-04-08T10:52:02.250Z"
            title="2021-04-08T10:52:02.250Z"
          >
            7 days ago
          </time>
        </p>
      </div>
    `);
  });

  it('renders with time property defined', () => {
    const tree = renderer.create(<UserBar username="Batman" time="2021-04-08T10:52:02.297Z" />);

    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-user-bar"
      >
        <div
          className="raf-user-bar__details"
        >
          <p
            className="raf-user-bar__username"
            data-testid="user-bar-username"
          >
            Batman
          </p>
        </div>
        <p
          className="raf-user-bar__extra"
        >
          <time>
            2021-04-08T10:52:02.297Z
          </time>
        </p>
      </div>
    `);
  });

  it('checks if onClick has been called', () => {
    const handleClick = jest.fn();

    const { getByTestId } = render(<UserBar username="batman" onClickUser={handleClick} />);

    fireEvent.click(getByTestId('user-bar-username'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
