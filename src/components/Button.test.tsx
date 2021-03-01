import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, screen } from '@testing-library/react';

import { Button } from './Button';

describe('Button', () => {
  it('renders with default props', () => {
    const tree = renderer.create(<Button>Click</Button>);

    expect(tree).toMatchInlineSnapshot(`
      <button
        className="raf-button raf-button--info"
        disabled={false}
        type="button"
      >
        Click
      </button>
    `);
  });

  it('renders with custom props', () => {
    const tree = renderer.create(
      <Button type="submit" buttonStyle="primary" onClick={console.log} onKeyPress={console.log} loading />,
    );

    expect(tree).toMatchInlineSnapshot(`
      <button
        className="raf-button raf-button--primary"
        disabled={false}
        onClick={[Function]}
        onKeyPress={[Function]}
        type="submit"
      >
        <div
          className="rfu-loading-indicator__spinner"
          style={
            Object {
              "borderColor": "rgba(255,255,255,0.1)",
              "borderTopColor": "rgba(255,255,255,0.4)",
              "borderWidth": 2,
              "height": 20,
              "margin": "0 auto",
              "width": 20,
            }
          }
        />
      </button>
    `);
  });

  it('checks if onClick has been called', () => {
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Click</Button>);

    fireEvent.click(screen.getByText('Click'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('checks if onKeyPress has been called', () => {
    const onKeyPress = jest.fn();

    render(<Button onKeyPress={onKeyPress}>Click</Button>);

    fireEvent.keyPress(screen.getByText('Click'), {
      key: 'Enter',
      charCode: 13,
      code: 13,
    });

    expect(onKeyPress).toHaveBeenCalledTimes(1);
  });

  it('checks if disabled attribute works for click event', () => {
    const handleClick = jest.fn();

    render(
      <Button disabled onClick={handleClick}>
        Click
      </Button>,
    );

    fireEvent.click(screen.getByText('Click'));

    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});
