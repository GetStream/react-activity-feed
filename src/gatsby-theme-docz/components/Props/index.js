/** @jsx jsx */
import { useState, useMemo, Children } from 'react';
import { jsx } from 'theme-ui';

import * as styles from './styles';

export const ChevronDown = (props) => (
  <svg
    aria-hidden="true"
    data-icon="chevron-down"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    {...props}
  >
    <path
      fill="currentColor"
      d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
    ></path>
  </svg>
);

export const ChevronUp = (props) => (
  <svg
    aria-hidden="true"
    data-icon="chevron-up"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    {...props}
  >
    <path
      fill="currentColor"
      d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"
    ></path>
  </svg>
);

// our interpretation of default value looks like: #your-default-value-text#
const isDefaultValue = (text = '') => typeof text === 'string' && text.startsWith('#') && text.endsWith('#');
const removeDefaultValues = (children) =>
  Children.toArray(children).filter((v) => (v?.props?.children || []).some((v) => !isDefaultValue(v)));

export const getDefaultValue = ({ defaultValue, type, flowType, description }) => {
  const texts = Children.toArray(description)
    .map((v) => v?.props?.children)
    .flat(Infinity);

  const descriptionValue = texts.find(isDefaultValue);

  if (descriptionValue) return descriptionValue.replaceAll('#', '');

  const propType = flowType ? flowType : type;
  if (!defaultValue || !defaultValue.value) return null;
  if (defaultValue.value === "''") {
    return '[Empty string]';
  }
  if (propType && propType.name === 'string') {
    return defaultValue.value.replace(/'/g, '"');
  }
  if (typeof defaultValue.value === 'object' && defaultValue.value.toString) {
    return defaultValue.value.toString();
  }
  return defaultValue.value;
};

export const Prop = ({ propName, prop, getPropType, isToggle }) => {
  const [showing, setShowing] = useState(isToggle || false);
  if (!prop.type && !prop.flowType) return null;

  const toggle = () => setShowing((s) => !s);
  return (
    <div sx={styles.line} data-testid="prop">
      <div sx={styles.content}>
        <div sx={styles.propName} data-testid="prop-name">
          {propName}
        </div>
        <div sx={styles.propType} data-testid="prop-type">
          {getPropType(prop)}
        </div>
        {prop.defaultValue && (
          <div sx={styles.defaultValue} data-testid="prop-default-value">
            <em>{getDefaultValue(prop)}</em>
          </div>
        )}
        <div sx={styles.right}>
          {prop.required && (
            <div sx={styles.propRequired} data-testid="prop-required">
              <strong>required</strong>
            </div>
          )}
          {prop.description && (
            <button sx={styles.openDescBtn} onClick={toggle} data-testid="prop-toggle-description">
              {showing ? <ChevronUp style={{ height: 20 }} /> : <ChevronDown style={{ height: 20 }} />}
            </button>
          )}
        </div>
      </div>
      {showing && prop.description && (
        <div sx={styles.description} data-testid="prop-description">
          {removeDefaultValues(prop.description)}
        </div>
      )}
    </div>
  );
};

export const Props = ({ props, getPropType, isToggle }) => {
  const entries = useMemo(() => Object.entries(props), [props]);

  return (
    <div sx={styles.container} data-testid="props">
      {entries.map(([key, prop]) => (
        <Prop key={key} propName={key} prop={prop} getPropType={getPropType} isToggle={isToggle} />
      ))}
    </div>
  );
};
