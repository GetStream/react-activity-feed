import renderer from 'react-test-renderer';
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
});
