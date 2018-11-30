### Features:

- OG scraping
- Image uploads
- File uploads
- Emoji select and autocomplete

```js
<StreamApp
  apiKey="3fjzn67nznwt"
  appId="41814"
  token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZXhhbXBsZS11c2VyIn0.XEKjtzD2AIQMLXH6kfJlL8P_JV4CBYvcMsmQCFjyY2U"
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
                  onClick={(e) => {
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
                CommentItem={(props) => {
                  return (
                    <React.Fragment>
                      <CommentItem {...props} />
                      <LikeButton reaction={props.comment} {...activityProps} />
                    </React.Fragment>
                  );
                }}
              />
            </React.Fragment>
          )}
        />
      );
    }}
  />
</StreamApp>
```
