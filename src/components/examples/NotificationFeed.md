NotificationFeed

```js
<StreamApp
  apiKey="fpwesm5u2evu"
  appId="64527"
  token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZXhhbXBsZS11c2VyIn0.cM6zFlcQ68qP2LLz-Y6fPeNglfOuwB2aeBUaQild1wg"
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
