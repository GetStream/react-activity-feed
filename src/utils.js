// @flow
import * as React from 'react';
import type { Renderable, RenderableButNotElement } from './types';
import moment from 'moment';

export function humanizeTimestamp(timestamp: string | number): string {
  const time = moment.utc(timestamp); // parse time as UTC
  const now = moment();
  // Not in future humanized time
  return moment.min(time, now).from(now);
}

export const smartRender = (
  ElementOrComponentOrLiteral: Renderable,
  props?: {},
  fallback?: Renderable,
) => {
  if (ElementOrComponentOrLiteral === undefined) {
    ElementOrComponentOrLiteral = fallback;
  }
  if (React.isValidElement(ElementOrComponentOrLiteral)) {
    return ElementOrComponentOrLiteral;
  }

  // Flow cast through any to remove React.Element after previous check
  const ComponentOrLiteral = ((ElementOrComponentOrLiteral: any): RenderableButNotElement);
  if (
    typeof ComponentOrLiteral === 'string' ||
    typeof ComponentOrLiteral === 'number' ||
    typeof ComponentOrLiteral === 'boolean' ||
    ComponentOrLiteral == null
  ) {
    return ComponentOrLiteral;
  }
  return <ComponentOrLiteral {...props} />;
};
