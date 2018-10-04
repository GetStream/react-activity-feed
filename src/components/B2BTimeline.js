import * as React from 'react';
import TimeHeader from './TimeHeader';

/**
 * Component is described here.
 *
 * @example ./examples/B2BTimeline.md
 */

export default class B2BTimeline extends React.Component {
  render() {
    return (
      <div className="raf-b2btimeline">
        <div className="raf-b2btimeline__line">
          <div className="line" />

          <div className="raf-b2btimeline__icon" />
        </div>
        <div className="raf-b2btimeline__feed">
          <TimeHeader>datum</TimeHeader>
          <TimeHeader>datum</TimeHeader>
          <TimeHeader>datum</TimeHeader>
          <TimeHeader>datum</TimeHeader>
          <TimeHeader>datum</TimeHeader>
          <TimeHeader>datum</TimeHeader>
          <TimeHeader>datum</TimeHeader>
          <TimeHeader>datum</TimeHeader>
          <TimeHeader>datum</TimeHeader>
          <TimeHeader>datum</TimeHeader>
        </div>
      </div>
    );
  }
}
