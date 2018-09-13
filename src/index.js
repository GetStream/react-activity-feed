// @flow
import React, { Component } from 'react';

import styles from './styles.css';

export default class ExampleComponent extends Component<{ text: string }> {
  render() {
    const { text } = this.props;

    return <div className={styles.test}>Example Component: {text}</div>;
  }
}
