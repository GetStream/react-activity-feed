import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { textRenderer } from '../utils';

describe('utils -> textRenderer', () => {
  const onClickCallback = (word: string) => word;

  const textRendererWithCallbacks = (text: string) =>
    textRenderer(text, '', onClickCallback, onClickCallback);

  it('is renders @ without callback func correctly', () => {
    const tree = renderer
      .create(
        textRenderer(
          "@allison's @allison! @allison? (@allison) [@allison] @allison; @allison: @allison, @allison @allison_allison",
          '',
        ),
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('is renders @ with callback func correctly', () => {
    const tree = renderer
      .create(
        textRendererWithCallbacks(
          "@allison's @allison! @allison? (@allison) [@allison] @allison; @allison: @allison, @allison @allison_allison",
        ),
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('is renders # without callback func correctly', () => {
    const tree = renderer
      .create(
        textRenderer(
          "#stream's #stream! #stream? (#stream) [#stream] #stream; #stream: #stream, #stream #stream_stream",
          '',
        ),
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('is renders # with callback func correctly', () => {
    const tree = renderer
      .create(
        textRendererWithCallbacks(
          "#stream's #stream! #stream? (#stream) [#stream] #stream; #stream: #stream, #stream #stream_stream",
        ),
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('is renders # with underline in it', () => {
    const tree = renderer
      .create(textRendererWithCallbacks('#stream_nice'))
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('is renders hyperlinks in correct format', () => {
    expect(
      renderer
        .create(textRenderer('https://getstream.io/', 'some-class'))
        .toJSON(),
    ).toMatchInlineSnapshot(`
      <a
        className="some-class__link"
        data-testid="renderWord-hyperlink"
        href="https://getstream.io/"
        rel="nofollow noreferrer noopener"
        target="blank"
      >
        getstream.io/
      </a>
    `);
  });

  it('is renders multiple hyperlinks correctly', () => {
    expect(renderer.create(textRenderer('t.co g.co')).toJSON())
      .toMatchInlineSnapshot(`
      Array [
        <a
          className="undefined__link"
          data-testid="renderWord-hyperlink"
          href="http://t.co"
          rel="nofollow noreferrer noopener"
          target="blank"
        >
          t.co
        </a>,
        " ",
        <a
          className="undefined__link"
          data-testid="renderWord-hyperlink"
          href="http://g.co"
          rel="nofollow noreferrer noopener"
          target="blank"
        >
          g.co
        </a>,
      ]
    `);
  });

  it('hyperlinks has proper truncation', () => {
    const url = 'https://getstream.io/some-nice-but-extra-long-url';
    const { getByTestId } = render(textRenderer(url));

    const link = getByTestId('renderWord-hyperlink');
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent('getstream.io/some-nice-but-ext...');
    expect(link).toHaveAttribute('href', url);
  });

  [
    { input: 'getstream.com', output: 'http://getstream.com' },
    { input: 'www.getstream.com', output: 'http://www.getstream.com' },
    { input: 'getstream.io/?nice=y', output: 'http://getstream.io/?nice=y' },
    { input: 'www.getstream.co.uk', output: 'http://www.getstream.co.uk' },
    { input: 'www.getstream.io/ro/', output: 'http://www.getstream.io/ro/' },
    { input: 'www.getstream.io:45/r', output: 'http://www.getstream.io:45/r' },
    { input: 'https://getstream.com', output: 'https://getstream.com' },
    { input: 'https://getstream.com/', output: 'https://getstream.com/' },
    { input: 'https://www.getstream.com', output: 'https://www.getstream.com' },
    { input: 'http://getstream.com', output: 'http://getstream.com' },
    { input: 'https://www.goog?le.com', output: 'https://www.goog?le.com' },
    { input: 'amin@getstream.com', output: 'mailto:amin@getstream.com' },
    { input: 'amin@getstream.co.uk', output: 'mailto:amin@getstream.co.uk' },
    { input: 'amin.corvi@io.net', output: 'mailto:amin.corvi@io.net' },
    { input: 'amin-s@getstream.com', output: 'mailto:amin-s@getstream.com' },
    { input: 'amin+2@getstream.io', output: 'mailto:amin+2@getstream.io' },
    {
      input: 'https://www.google.ca/maps/@43.472082,-80.5426668,18z?hl=en',
      output: 'https://www.google.ca/maps/@43.472082,-80.5426668,18z?hl=en',
    },
  ].forEach(({ input, output }) => {
    it(`renders the link correctly for ${input}`, () => {
      const { getByTestId } = render(textRenderer(input));
      expect(getByTestId('renderWord-hyperlink')).toHaveAttribute(
        'href',
        output,
      );
    });
  });

  [
    'stream',
    'stream email',
    'getstream.nonvalidtld',
    'amin@getstream.nonvalidtld',
  ].forEach((input) => {
    it(`invalid link is not rendered ${input}`, () => {
      const { queryByTestId } = render(textRenderer(input));
      expect(queryByTestId('renderWord-hyperlink')).not.toBeInTheDocument();
    });
  });
});
