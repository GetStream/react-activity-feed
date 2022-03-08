import React from 'react';
import renderer from 'react-test-renderer';

import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('renders correctly with default props', () => {
    const tree = renderer.create(<Textarea />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="rta  raf-textarea"
      >
        <textarea
          className="rta__textarea raf-textarea__textarea"
          onBlur={[Function]}
          onChange={[Function]}
          onClick={[Function]}
          onScroll={[Function]}
          onSelect={[Function]}
          placeholder="Share your opinion"
          rows={3}
          value=""
        />
      </div>
    `);
  });

  it('forwards native textarea HTML attributes', () => {
    const tree = renderer.create(<Textarea required={true} role={'dialog'} />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="rta  raf-textarea"
      >
        <textarea
          className="rta__textarea raf-textarea__textarea"
          onBlur={[Function]}
          onChange={[Function]}
          onClick={[Function]}
          onScroll={[Function]}
          onSelect={[Function]}
          placeholder="Share your opinion"
          required={true}
          role="dialog"
          rows={3}
          value=""
        />
      </div>
    `);
  });
});
