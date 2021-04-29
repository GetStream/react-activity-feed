import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CommentField, CommentFieldProps } from './CommentField';
import { FeedProvider } from '../Context';

describe('CommentField', () => {
  it('renders with default props', () => {
    const tree = renderer.create(<CommentField activity={({} as unknown) as CommentFieldProps['activity']} />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <form
        className="raf-comment-field"
        onSubmit={[Function]}
      >
        <div
          className="raf-comment-field__group"
        >
          <div
            className="rta  raf-textarea"
          >
            <textarea
              className="rta__textarea raf-textarea__textarea"
              maxLength={280}
              onBlur={[Function]}
              onChange={[Function]}
              onClick={[Function]}
              onScroll={[Function]}
              onSelect={[Function]}
              placeholder="Start Typing..."
              rows={1}
              value=""
            />
          </div>
          <button
            className="raf-button raf-button--primary"
            disabled={true}
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
    `);
  });

  it('renders with image and placeholder', () => {
    const tree = renderer
      .create(
        <CommentField
          activity={({} as unknown) as CommentFieldProps['activity']}
          image="https://getstream.imgix.net/images/random_svg/A.png"
          placeholder="Add a comment"
        />,
      )
      .toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <form
        className="raf-comment-field"
        onSubmit={[Function]}
      >
        <img
          alt=""
          className="raf-avatar  raf-avatar--circle"
          src="https://getstream.imgix.net/images/random_svg/A.png"
          style={
            Object {
              "height": "39px",
              "width": "39px",
            }
          }
        />
        <div
          className="raf-comment-field__group"
        >
          <div
            className="rta  raf-textarea"
          >
            <textarea
              className="rta__textarea raf-textarea__textarea"
              maxLength={280}
              onBlur={[Function]}
              onChange={[Function]}
              onClick={[Function]}
              onScroll={[Function]}
              onSelect={[Function]}
              placeholder="Add a comment"
              rows={1}
              value=""
            />
          </div>
          <button
            className="raf-button raf-button--primary"
            disabled={true}
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
    `);
  });

  it('changes value onChange and after button click', async () => {
    const onAddReaction = jest.fn();
    const successFn = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      // @ts-expect-error
      <FeedProvider value={{ onAddReaction }}>
        <CommentField
          activity={({} as unknown) as CommentFieldProps['activity']}
          onSuccess={successFn}
          placeholder="textarea"
        />
      </FeedProvider>,
    );

    const text = 'test';
    const button = getByText('Post');
    const textarea = getByPlaceholderText('textarea');

    fireEvent.change(textarea, { target: { value: text } });

    expect(textarea).toHaveValue(text);

    //  eslint-disable-next-line require-await
    await act(async () => {
      fireEvent.click(button);
    });

    expect(onAddReaction).toHaveBeenCalledWith('comment', {}, { text });
    expect(successFn).toHaveBeenCalled();
    expect(textarea).toHaveValue('');
  });
});
