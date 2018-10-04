import * as React from 'react';
// import TimeHeader from './TimeHeader';
// import B2BActivity from './B2BActivity';

/**
 * Component is described here.
 *
 * @example ./examples/B2BTimeline.md
 */
export default class B2BTimeline extends React.Component {
  sortByYearMonth = (activities) => {
    const newActivities = {};
    activities.map((activity) => {
      const month = new Date(activity.timestamp).getMonth();
      const year = new Date(activity.timestamp).getFullYear();
      if (newActivities[year] === undefined) {
        newActivities[year] = {};
        newActivities[year][month] = [];
        newActivities[year][month].push(activity);
      } else if (newActivities[year][month] === undefined) {
        newActivities[year][month] = [];
        newActivities[year][month].push(activity);
      } else {
        newActivities[year][month].push(activity);
      }
    });

    return newActivities;
  };

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
          {Object.keys(this.sortByYearMonth(this.props.activities)).forEach(
            (key) => (
              <p>{key}</p>
            ),
          )}

          {/* {this.props.activities.map((activity ,i) => (
            <B2BActivity activity={activity} />
          ))} */}
        </div>
      </div>
    );
  }
}
