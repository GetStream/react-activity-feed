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
    notify
    Activity={(props) => (
      <Activity
        {...props}
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
      />
    )}
  />
</StreamApp>
```
