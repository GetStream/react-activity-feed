NotificationFeed

```js
<StreamApp
  apiKey="3fjzn67nznwt"
  appId="41814"
  token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZXhhbXBsZS11c2VyIn0.XEKjtzD2AIQMLXH6kfJlL8P_JV4CBYvcMsmQCFjyY2U"
>
  <NotificationFeed
    Group={(props) => (
      <Notification
        {...props}
        onClickUser={(user) => console.log(user)}
        onClickNotification={(notification) => console.log(notification)}
      />
    )}
  />
</StreamApp>
```
