```js
// this is just an example, you get this from a feed
const activityId = 'aba1d300-dc4a-11e8-8080-80010edf5810';

<StreamApp
  apiKey="fpwesm5u2evu"
  appId="64527"
  token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZXhhbXBsZS11c2VyIn0.cM6zFlcQ68qP2LLz-Y6fPeNglfOuwB2aeBUaQild1wg"
>
  <SinglePost
    activityId={activityId}
    feedGroup="timeline"
    Activity={(props) => (
      <React.Fragment>
        <Activity
          {...props}
          Footer={
            <div style={{ padding: '0 16px 16px' }}>
              <CommentField
                activity={props.activity}
                onAddReaction={props.onAddReaction}
              />
              <CommentList activityId={props.activity.id} />
            </div>
          }
        />
      </React.Fragment>
    )}
  />
</StreamApp>;
```
