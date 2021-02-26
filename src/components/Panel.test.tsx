import React from 'react';
import renderer from 'react-test-renderer';

import { Panel, PanelContent, PanelHeading, PanelFooter } from './Panel';

describe('Panel', () => {
  it('renders with default props', () => {
    const tree = renderer
      .create(
        <Panel>
          <PanelHeading>Header</PanelHeading>
          <PanelContent>Content</PanelContent>
          <PanelFooter>Footer</PanelFooter>
        </Panel>,
      )
      .toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-panel raf-panel--rounded"
      >
        <div
          className="raf-panel-header"
        >
          Header
        </div>
        <div
          className="raf-panel-content"
        >
          Content
        </div>
        <div
          className="raf-panel-footer"
        >
          Footer
        </div>
      </div>
    `);
  });

  it('renders with custom props', () => {
    const tree = renderer
      .create(
        <Panel panelStyle="square">
          <PanelHeading>Header</PanelHeading>
          <PanelContent>Content</PanelContent>
          <PanelFooter>Footer</PanelFooter>
        </Panel>,
      )
      .toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="raf-panel raf-panel--square"
      >
        <div
          className="raf-panel-header"
        >
          Header
        </div>
        <div
          className="raf-panel-content"
        >
          Content
        </div>
        <div
          className="raf-panel-footer"
        >
          Footer
        </div>
      </div>
    `);
  });
});
