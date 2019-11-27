### Features:

- OG scraping
- Image uploads
- File uploads
- Emoji select and autocomplete

```js
<StreamApp
  apiKey="fpwesm5u2evu"
  appId="64527"
  token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZXhhbXBsZS11c2VyIn0.cM6zFlcQ68qP2LLz-Y6fPeNglfOuwB2aeBUaQild1wg"
>
  <StatusUpdateForm />
  <FlatFeed
    feedGroup="user"
    options={{ withRecentReactions: true, limit: 10, withOwnChildren: true }}
    notify
    Activity={(props) => {
      const hasSubActivity = Boolean(props.activity.object.object);
      const activity = hasSubActivity ? props.activity.object : props.activity;
      const activityProps = props;
      return (
        <Activity
          {...props}
          activity={activity}
          HeaderRight={() => (
            <Dropdown>
              <div>
                <Link
                  onClick={() => {
                    props.onRemoveActivity(props.activity.id);
                  }}
                >
                  Remove
                </Link>
              </div>
            </Dropdown>
          )}
          Footer={() => (
            <React.Fragment>
              <ActivityFooter {...props} activity={activity} />
              <CommentField
                activity={activity}
                onAddReaction={props.onAddReaction}
              />
              <CommentList
                activityId={activity.id}
                activityPath={
                  hasSubActivity ? [props.activity.id, 'object'] : null
                }
                CommentItem={(props) => (
                  <React.Fragment>
                    <CommentItem {...props} />
                    <LikeButton reaction={props.comment} {...activityProps} />
                  </React.Fragment>
                )}
              />
            </React.Fragment>
          )}
        />
      );
    }}
  />
</StreamApp>
```
