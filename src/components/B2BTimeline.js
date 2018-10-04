import * as React from 'react';
import TimeHeader from './TimeHeader';
// import B2BActivity from './B2BActivity';

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

/**
 * Component is described here.
 *
 * @example ./examples/B2BTimeline.md
 */
export default class B2BTimeline extends React.Component {
  sortByYearMonth(activities) {
    const newActivities = {};
    activities.map((activity) => {
      const month = new Date(activity.timestamp).getMonth();
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

  timeline(activities) {
    const sorted = this.sortByYearMonth(activities);
    return Object.keys(sorted)
      .sort((a, b) => b - a)
      .map(function(year) {
        return Object.keys(sorted[year])
          .sort((a, b) => b - a)
          .map(function(month, i) {
            return (
              <React.Fragment key={`month-${month}-${i}`}>
                <TimeHeader>{`${MONTHS[month]} ${year}`}</TimeHeader>
                {sorted[year][month].map((
                  post,
                  i, // map over posts in month
                ) => (
                  <p key={`post-${i}`}>
                    <code>{JSON.stringify(post)}</code>
                  </p>
                ))}
              </React.Fragment>
            );
          });
      });
  }

  render() {
    const icon =
      '<svg width="20" height="19" viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg"><path d="M19.99 7c0-.72-.37-1.35-.94-1.7L10 0 .95 5.3C.38 5.65 0 6.28 0 7v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2l-.01-10zM10 12L1.74 6.84 10 2l8.26 4.84L10 12z" fill="#A0B2B8" fill-rule="evenodd"/></svg>';
    return (
      <div className="raf-b2btimeline">
        <div className="raf-b2btimeline__line">
          <div className="line" />

          <div
            className="raf-b2btimeline__icon"
            dangerouslySetInnerHTML={{ __html: icon }}
          />
          <div
            className="raf-b2btimeline__icon"
            dangerouslySetInnerHTML={{ __html: icon }}
          />
        </div>
        <div className="raf-b2btimeline__feed">
          {this.timeline(this.props.activities)}
        </div>
      </div>
    );
  }
}
