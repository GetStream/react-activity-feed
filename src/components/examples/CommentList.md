CommentList

```js
// this is just an example, you get this from a feed
const activityId = 'aba1d300-dc4a-11e8-8080-80010edf5810';

<StreamApp
  apiKey="3fjzn67nznwt"
  appId="41814"
  token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZXhhbXBsZS11c2VyIn0.XEKjtzD2AIQMLXH6kfJlL8P_JV4CBYvcMsmQCFjyY2U"
>
  <SinglePost
    feedGroup="timeline"
    activityId={activityId}
    Activity={(props) => <CommentList activityId={props.activity.id} />}
  />
</StreamApp>;
```
