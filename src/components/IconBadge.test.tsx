import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { IconBadge } from './IconBadge';

jest.mock('./Icons', () => ({ BellIcon: () => 'BellIcon' }));

describe('IconBadge', () => {
  it('renders with default props', () => {
    const tree = renderer.create(<IconBadge />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-icon-badge"
        role="button"
      >
        BellIcon
      </div>
    `);
  });

  it('renders with custom icon', () => {
    const tree = renderer.create(<IconBadge>ICON</IconBadge>).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-icon-badge"
        role="button"
      >
        ICON
      </div>
    `);
  });

  it('with unseen prop', () => {
    const { getByTestId } = render(<IconBadge unseen={1} />);
    expect(getByTestId('unseen-wrapper')).toBeInTheDocument();
    expect(getByTestId('unseen-wrapper')).toHaveTextContent('');
  });

  it('with unseen and showNumber prop', () => {
    const { getByTestId } = render(<IconBadge unseen={1} showNumber />);
    expect(getByTestId('unseen-wrapper')).toBeInTheDocument();
    expect(getByTestId('unseen-count')).toBeInTheDocument();
    expect(getByTestId('unseen-count')).toHaveTextContent('1');
  });

  it('with unseen but hidden', () => {
    const { queryByTestId } = render(<IconBadge unseen={1} hidden />);
    expect(queryByTestId('unseen-wrapper')).not.toBeInTheDocument();
  });
});
