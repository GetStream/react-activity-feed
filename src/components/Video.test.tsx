import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import { Video } from './Video';

const imgurOgTestData = {
  site_name: 'imgur',
  title: 'Video title',
  description: 'Video description',
  url: 'https://imgur.com/gallery/hkj7IZQ',
  videos: [
    {
      type: 'video/mp4',
      video: 'https://i.imgur.com/pi2FUNN.mp4',
    },
  ],
};

const youtubeOgTestData = {
  site_name: 'YouTube',
  videos: [
    {
      type: 'text/html',
      video: 'https://www.youtube.com/watch?v=IVkOFxrKRjA',
      width: 596,
      height: 335,
    },
  ],
};

describe('Video', () => {
  it('renders with default props', () => {
    const tree = renderer.create(<Video og={{}} />).toJSON();
    expect(tree).toMatchInlineSnapshot(`null`);
  });

  it('renders YouTube video (iframe)', () => {
    const tree = renderer.create(<Video og={youtubeOgTestData} />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-video__frame"
      >
        <iframe
          frameBorder="0"
          height={335}
          id="ytplayer"
          src="https://www.youtube.com/embed/IVkOFxrKRjA"
          title="embedded player"
          width={596}
        />
      </div>
    `);
  });

  it('renders MP4 video with poster attribute (image URL specified)', () => {
    const tree = renderer
      .create(
        <Video
          og={{
            site_name: 'gfycat',
            title: 'Video title',
            description: 'Video description',
            url: 'https://gfycat.com/impeccableclearcutduck-aurelia-kaeslin-horserescue-sanctuary',
            videos: [
              {
                type: 'video/mp4',
                video: 'https://giant.gfycat.com/ImpeccableClearcutDuck.mp4',
              },
            ],
            images: [{ image: 'https://thumbs.gfycat.com/ImpeccableClearcutDuck-mobile.jpg' }],
          }}
        />,
      )
      .toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-video__video"
      >
        <video
          className="raf-video__video--video"
          controls={true}
          poster="https://thumbs.gfycat.com/ImpeccableClearcutDuck-mobile.jpg"
          preload="metadata"
        >
          <source
            src="https://giant.gfycat.com/ImpeccableClearcutDuck.mp4"
            type="video/mp4"
          />
        </video>
        <div
          className="raf-video__video--content"
        >
          <div
            className="raf-video__video--title"
          >
            Video title
          </div>
          <div
            className="raf-video__video--description"
          >
            Video description
          </div>
          <div
            className="raf-video__video--link"
          >
            <a
              href="https://gfycat.com/impeccableclearcutduck-aurelia-kaeslin-horserescue-sanctuary"
              target="blank"
            >
              gfycat
            </a>
          </div>
        </div>
      </div>
    `);
  });

  it('renders as GIF (different video options, with default urlsThatAreGifs property)', () => {
    const tree = renderer.create(<Video og={imgurOgTestData} />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-video__video"
      >
        <video
          autoPlay={true}
          className="raf-video__video--video"
          controls={false}
          loop={true}
          muted={true}
          playsInline={true}
          preload="auto"
        >
          <source
            src="https://i.imgur.com/pi2FUNN.mp4"
            type="video/mp4"
          />
        </video>
        <div
          className="raf-video__video--content"
        >
          <div
            className="raf-video__video--title"
          >
            Video title
          </div>
          <div
            className="raf-video__video--description"
          >
            Video description
          </div>
          <div
            className="raf-video__video--link"
          >
            <a
              href="https://imgur.com/gallery/hkj7IZQ"
              target="blank"
            >
              imgur
            </a>
          </div>
        </div>
      </div>
    `);
  });

  it('renders with GIF URL but as MP4 (normal video settings) with empty urlsThatAreGifs array', () => {
    const tree = renderer.create(<Video urlsThatAreGifs={[]} og={imgurOgTestData} />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-video__video"
      >
        <video
          className="raf-video__video--video"
          controls={true}
          preload="metadata"
        >
          <source
            src="https://i.imgur.com/pi2FUNN.mp4"
            type="video/mp4"
          />
        </video>
        <div
          className="raf-video__video--content"
        >
          <div
            className="raf-video__video--title"
          >
            Video title
          </div>
          <div
            className="raf-video__video--description"
          >
            Video description
          </div>
          <div
            className="raf-video__video--link"
          >
            <a
              href="https://imgur.com/gallery/hkj7IZQ"
              target="blank"
            >
              imgur
            </a>
          </div>
        </div>
      </div>
    `);
  });

  it('checks if handleClose callback has been called', () => {
    const onClick = jest.fn();
    const { getByRole } = render(<Video handleClose={onClick} og={youtubeOgTestData} />);

    fireEvent.click(getByRole('button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
