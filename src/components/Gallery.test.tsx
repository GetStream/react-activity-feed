import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Gallery } from './Gallery';

jest.mock(
  'react-image-lightbox',
  // eslint-disable-next-line react/display-name
  () => ({ onCloseRequest, mainSrc }: { onCloseRequest: () => void; mainSrc?: string }) => (
    <div onClick={onCloseRequest}>
      lightbox <span>{mainSrc}</span>
    </div>
  ),
);

const testData = [
  'https://source.unsplash.com/random/800x600',
  'https://source.unsplash.com/random/800x601',
  'https://source.unsplash.com/random/800x603',
];

describe('Gallery', () => {
  it('renders with an empty images array', () => {
    const tree = renderer.create(<Gallery images={[]} />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-gallery"
      />
    `);
  });

  it('renders with one image', () => {
    const tree = renderer.create(<Gallery images={[testData[0]]} />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-gallery"
      >
        <div
          className="img "
          onClick={[Function]}
          role="button"
        >
          <img
            alt=""
            className="raf-gallery__image"
            src="https://source.unsplash.com/random/800x600"
          />
        </div>
      </div>
    `);
  });

  it('renders with multiple images', () => {
    const tree = renderer.create(<Gallery images={testData} />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-gallery"
      >
        <div
          className="img "
          onClick={[Function]}
          role="button"
        >
          <img
            alt=""
            className="raf-gallery__image"
            src="https://source.unsplash.com/random/800x600"
          />
        </div>
        <div
          className="img "
          onClick={[Function]}
          role="button"
        >
          <img
            alt=""
            className="raf-gallery__image"
            src="https://source.unsplash.com/random/800x601"
          />
        </div>
        <div
          className="img "
          onClick={[Function]}
          role="button"
        >
          <img
            alt=""
            className="raf-gallery__image"
            src="https://source.unsplash.com/random/800x603"
          />
        </div>
      </div>
    `);
  });

  it('renders Lightbox after click on one of the images', () => {
    const { getByAltText, getByText, container } = render(<Gallery images={[testData[0]]} />);

    fireEvent.click(getByAltText(''));

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="raf-gallery"
      >
        <div
          class="img "
          role="button"
        >
          <img
            alt=""
            class="raf-gallery__image"
            src="https://source.unsplash.com/random/800x600"
          />
        </div>
        <div>
          lightbox 
          <span>
            https://source.unsplash.com/random/800x600
          </span>
        </div>
      </div>
    `);

    fireEvent.click(getByText('lightbox'));

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="raf-gallery"
      >
        <div
          class="img "
          role="button"
        >
          <img
            alt=""
            class="raf-gallery__image"
            src="https://source.unsplash.com/random/800x600"
          />
        </div>
      </div>
    `);
  });
});
