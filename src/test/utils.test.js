// @flow
import { textRenderer } from '../utils';
import renderer from 'react-test-renderer';

describe('utils -> textRenderer', () => {
  const onMentionClick = (word) => word;

  const textRendererWithCallbacks = (text) =>
    textRenderer(text, '', onMentionClick, (word) => word);

  it('is renders @ without callback func correctly ', () => {
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

  it('is renders @ with callback func correctly ', () => {
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
});
