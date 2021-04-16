import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { DropdownPanel } from './DropdownPanel';

describe('DropdownPanel', () => {
  it('renders with default props', () => {
    const tree = renderer.create(<DropdownPanel>Children</DropdownPanel>).toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-dropdown-panel  raf-dropdown-panel--left raf-dropdown-panel--arrow-left"
        data-testid="dp-wrapper"
      >
        <div
          className="raf-dropdown-panel__content"
        >
          Children
        </div>
      </div>
    `);
  });

  it('renders Header & Footer correctly', () => {
    const tree = renderer
      .create(
        <DropdownPanel Header={<div>Header</div>} Footer={<div>Footer</div>}>
          Children
        </DropdownPanel>,
      )
      .toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-dropdown-panel  raf-dropdown-panel--left raf-dropdown-panel--arrow-left"
        data-testid="dp-wrapper"
      >
        <div
          className="raf-dropdown-panel__header"
        >
          <div>
            Header
          </div>
        </div>
        <div
          className="raf-dropdown-panel__content"
        >
          Children
        </div>
        <div
          className="raf-dropdown-panel__footer"
        >
          <div>
            Footer
          </div>
        </div>
      </div>
    `);
  });

  it('arrow prop', () => {
    const { getByTestId } = render(<DropdownPanel arrow />);
    expect(getByTestId('dp-wrapper')).toHaveClass('raf-dropdown-panel--arrow');
  });

  it('right prop', () => {
    const { getByTestId } = render(<DropdownPanel right />);
    expect(getByTestId('dp-wrapper')).toHaveClass('raf-dropdown-panel--right');
    expect(getByTestId('dp-wrapper')).toHaveClass('raf-dropdown-panel--arrow-right');
  });
});
