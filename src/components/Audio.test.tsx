import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';

import { Audio } from './Audio';

const ogTestData = {
  audios: [{ secure_url: 'https://media1.vocaroo.com/mp3/17SJoO2u3JcO' }],
  images: [{ image: 'https://i1.sndcdn.com/artworks-000239059018-lxf0kl-t500x500.jpg' }],
  title: 'Jesse James',
  description: 'Perla',
};

describe('Audio', () => {
  it('renders with default props', () => {
    const tree = renderer.create(<Audio og={ogTestData} />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-audio"
      >
        <div
          className="raf-audio__wrapper"
        >
          <audio>
            <source
              src="https://media1.vocaroo.com/mp3/17SJoO2u3JcO"
              type="audio/mp3"
            />
          </audio>
          <div
            className="raf-audio__image"
          >
            <div
              className="raf-audio__image--overlay"
            >
              <div
                className="raf-audio__image--button"
                onClick={[Function]}
              >
                <svg
                  aria-hidden="true"
                  className="svg-inline--fa fa-play-circle fa-w-16 "
                  data-icon="play-circle"
                  data-prefix="far"
                  focusable="false"
                  role="img"
                  style={Object {}}
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M371.7 238l-176-107c-15.8-8.8-35.7 2.5-35.7 21v208c0 18.4 19.8 29.8 35.7 21l176-101c16.4-9.1 16.4-32.8 0-42zM504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256z"
                    fill="currentColor"
                    style={Object {}}
                  />
                </svg>
              </div>
            </div>
            <img
              alt="Perla"
              src="https://i1.sndcdn.com/artworks-000239059018-lxf0kl-t500x500.jpg"
            />
          </div>
          <div
            className="raf-audio__content"
          >
            <span
              className="raf-audio__content--title"
            >
              <strong>
                Jesse James
              </strong>
            </span>
            <span
              className="raf-audio__content--subtitle"
            >
              Perla
            </span>
            <div
              className="raf-audio__content--progress"
            >
              <div
                style={
                  Object {
                    "width": "0%",
                  }
                }
              />
            </div>
          </div>
        </div>
      </div>
    `);
  });

  it('checks if handleClose callback has been called', () => {
    const handleClick = jest.fn();

    const { getByRole } = render(<Audio og={ogTestData} handleClose={handleClick} />);

    fireEvent.click(getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
