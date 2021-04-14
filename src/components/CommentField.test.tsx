import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CommentField, CommentFieldProps } from './CommentField';

describe('CommentField', () => {
  it('renders with default props', () => {
    const tree = renderer
      .create(
        <CommentField
          activity={({} as unknown) as CommentFieldProps['activity']}
          onAddReaction={async (...data) => await console.log(data)}
        />,
      )
      .toJSON();
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
          onAddReaction={async (...data) => await console.log(data)}
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
    const reactionFn = jest.fn(async (...data) => await console.log(data));
    const successFn = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <CommentField
        activity={({} as unknown) as CommentFieldProps['activity']}
        onAddReaction={reactionFn}
        onSuccess={successFn}
        placeholder="textarea"
      />,
    );

    const button = getByText('Post');
    const textarea = getByPlaceholderText('textarea');

    fireEvent.change(textarea, { target: { value: 'test' } });

    expect(textarea).toHaveValue('test');

    //  eslint-disable-next-line require-await
    await act(async () => {
      fireEvent.click(button);
    });

    expect(reactionFn).toHaveBeenCalled();
    expect(successFn).toHaveBeenCalled();
    expect(textarea).toHaveValue('');
  });
});
