CommentList

```js
// this is just an example, you get this from a feed
const activityId = 'aba1d300-dc4a-11e8-8080-80010edf5810';

<StreamApp
  apiKey="fpwesm5u2evu"
  appId="64527"
  token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZXhhbXBsZS11c2VyIn0.cM6zFlcQ68qP2LLz-Y6fPeNglfOuwB2aeBUaQild1wg"
>
  <SinglePost
    feedGroup="timeline"
    activityId={activityId}
    Activity={(props) => <CommentList activityId={props.activity.id} />}
  />
</StreamApp>;
```
