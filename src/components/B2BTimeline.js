import * as React from 'react';
import TimeHeader from './TimeHeader';
import B2BActivity from './B2BActivity';

const MONTHS = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};

const icon =
  '<svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="M14 8H8v6H6V8H0V6h6V0h2v6h6z" fill="#A0B2B8" fill-rule="evenodd"/></svg>';

/**
 * This component takes a list of activities and icons and transforms it into a timeline. Aimed at making B2B timelines easier. Does require a more custom data structure.
 *
 * @example ./examples/B2BTimeline.md
 */
export default class B2BTimeline extends React.Component {
  sortByYearMonth(activities) {
    const newActivities = {};
    activities.map((activity) => {
      const month = new Date(activity.timestamp).getMonth() + 1;
      const year = new Date(activity.timestamp).getFullYear();
      if (newActivities[year] === undefined) {
        newActivities[year] = {};
        newActivities[year][month] = [];
        return newActivities[year][month].push(activity);
      } else if (newActivities[year][month] === undefined) {
        newActivities[year][month] = [];
        return newActivities[year][month].push(activity);
      } else {
        return newActivities[year][month].push(activity);
      }
    });

    return newActivities;
  }

  timeline = (activities, icons) => {
    const sorted = this.sortByYearMonth(activities);
    return Object.keys(sorted)
      .sort((a, b) => b - a)
      .map(function(year) {
        return Object.keys(sorted[year])
          .sort((a, b) => b - a)
          .map(function(month, i) {
            return (
              <React.Fragment key={`month-${month}-${i}`}>
                <div className="raf-b2btimeline__time">
                  <TimeHeader>{`${MONTHS[month]} ${year}`}</TimeHeader>
                </div>
                {sorted[year][month].map((post, i) => (
                  <div className="raf-b2btimeline__post" key={`post-${i}`}>
                    <div
                      className="raf-b2btimeline__icon"
                      dangerouslySetInnerHTML={{
                        __html: icons[post.verb] || icon,
                      }}
                    />
                    <div className="raf-b2btimeline__post-content">
                      <B2BActivity activity={post} />
                    </div>
                  </div>
                ))}
              </React.Fragment>
            );
          });
      });
  };

  render() {
    return (
      <div className="raf-b2btimeline">
        <div className="raf-b2btimeline__feed">
          <div className="raf-b2btimeline__line">
            <div className="line" />
          </div>

          {this.timeline(this.props.activities, this.props.icons)}
        </div>
      </div>
    );
  }
}
