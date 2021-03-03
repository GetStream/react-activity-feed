import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, screen } from '@testing-library/react';

import { Card } from './Card';

describe('Card', () => {
  it('renders with default props', () => {
    const tree = renderer.create(<Card />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <a
        className="raf-card "
        rel="noopener"
        target="blank"
      >
        <div
          className="raf-card__content"
        >
          <div
            className="raf-card__content-left"
          >
            <p
              className="raf-card__title"
            />
            <p
              className="raf-card__url"
            >
              
            </p>
            <p
              className="raf-card__description"
            />
          </div>
        </div>
      </a>
    `);
  });

  it('renders with custom props', () => {
    const tree = renderer
      .create(
        <Card
          handleClose={console.log}
          image="https://getstream.imgix.net/images/random_svg/A.png"
          alt="image"
          description="description"
          title="title"
          url="https://getstream.io"
        />,
      )
      .toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <a
        className="raf-card raf-card--with-image"
        href="https://getstream.io"
        rel="noopener"
        target="blank"
      >
        <div
          className="rfu-icon-button"
          onClick={[Function]}
          role="button"
        >
          <div
            dangerouslySetInnerHTML={
              Object {
                "__html": "<svg width=\\"28\\" height=\\"28\\" viewBox=\\"0 0 28 28\\" xmlns=\\"http://www.w3.org/2000/svg\\" xmlns:xlink=\\"http://www.w3.org/1999/xlink\\"><defs><path d=\\"M465 5c5.53 0 10 4.47 10 10s-4.47 10-10 10-10-4.47-10-10 4.47-10 10-10zm3.59 5L465 13.59 461.41 10 460 11.41l3.59 3.59-3.59 3.59 1.41 1.41 3.59-3.59 3.59 3.59 1.41-1.41-3.59-3.59 3.59-3.59-1.41-1.41z\\" id=\\"b\\"/><filter x=\\"-30%\\" y=\\"-30%\\" width=\\"160%\\" height=\\"160%\\" filterUnits=\\"objectBoundingBox\\" id=\\"a\\"><feOffset in=\\"SourceAlpha\\" result=\\"shadowOffsetOuter1\\"/><feGaussianBlur stdDeviation=\\"2\\" in=\\"shadowOffsetOuter1\\" result=\\"shadowBlurOuter1\\"/><feColorMatrix values=\\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0\\" in=\\"shadowBlurOuter1\\"/></filter></defs><g transform=\\"translate(-451 -1)\\" fill-rule=\\"nonzero\\" fill=\\"none\\"><use fill=\\"#000\\" filter=\\"url(#a)\\" xlink:href=\\"#b\\"/><use fill=\\"#FFF\\" fill-rule=\\"evenodd\\" xlink:href=\\"#b\\"/></g></svg>",
              }
            }
          />
        </div>
        <div
          className="raf-card__image"
        >
          <img
            alt="image"
            src="https://getstream.imgix.net/images/random_svg/A.png"
          />
        </div>
        <div
          className="raf-card__content"
        >
          <div
            className="raf-card__content-left"
          >
            <p
              className="raf-card__title"
            >
              title
            </p>
            <p
              className="raf-card__url"
            >
              getstream.io
            </p>
            <p
              className="raf-card__description"
            >
              description
            </p>
          </div>
        </div>
      </a>
    `);
  });

  it('does not render URL when nolink property is set to true', () => {
    const tree = renderer.create(<Card nolink url="https://getstream.io" />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <a
        className="raf-card "
        href={null}
        rel="noopener"
        target="blank"
      >
        <div
          className="raf-card__content"
        >
          <div
            className="raf-card__content-left"
          >
            <p
              className="raf-card__title"
            />
            <p
              className="raf-card__url"
            >
              getstream.io
            </p>
            <p
              className="raf-card__description"
            />
          </div>
        </div>
      </a>
    `);
  });

  it('checks if handleClose callback has been called', () => {
    const onClose = jest.fn();
    render(<Card handleClose={onClose} />);

    fireEvent.click(screen.getByRole('button'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
