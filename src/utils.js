// @flow
import * as React from 'react';
import moment from 'moment';
import type { Renderable, RenderableButNotElement } from './types';
// import type { UserResponse } from 'getstream';

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

export const getRetinaImage = (images: string) =>
  images
    .split('|')
    .map((item, i) => `${item} ${i + 1}x`)
    .join(', ');
// $FlowFixMe
export function userOrDefault(user: any | 'NotFound') {
  if (user === 'NotFound') {
    return {
      id: 'NotFound',
      data: { name: 'Unknown', profileImage: undefined },
    };
  }
  return user;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
