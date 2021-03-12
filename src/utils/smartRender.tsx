import React, { createElement, ReactElement, ElementType, ComponentType } from 'react';
import { UnknownRecord } from 'getstream';

type ElementOrComponentOrLiteralType<T> =
  | string
  | number
  | boolean
  | null
  | ReactElement<T>
  | ElementType<T>
  | ComponentType<T>;

export function smartRender<T extends UnknownRecord = UnknownRecord>(
  ElementOrComponentOrLiteral?: ElementOrComponentOrLiteralType<T>,
  props?: T,
  fallback?: ElementOrComponentOrLiteralType<T>,
) {
  const RenderComponent = ElementOrComponentOrLiteral === undefined ? fallback : ElementOrComponentOrLiteral;

  if (React.isValidElement(RenderComponent)) return RenderComponent;

  if (
    typeof RenderComponent === 'string' ||
    typeof RenderComponent === 'number' ||
    typeof RenderComponent === 'boolean' ||
    RenderComponent == null
  ) {
    return RenderComponent;
  }

  return createElement<T>(RenderComponent, props);
}
