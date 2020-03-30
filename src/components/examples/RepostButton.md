```js
<StreamApp
  apiKey="fpwesm5u2evu"
  appId="64527"
  token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZXhhbXBsZS11c2VyIn0.cM6zFlcQ68qP2LLz-Y6fPeNglfOuwB2aeBUaQild1wg"
>
  <RepostButton
    // this is just a mock of the data to render the example
    userId="123"
    activity={{
      own_reactions: { repost: [1] },
      reaction_counts: { repost: 7 },
    }}
    onToggleReaction={() => console.log('test')}
  />
</StreamApp>
```

```
<RepostButton
  // this is just a mock of the data to render the example
  userId="123"
  activity={{
    reaction_counts:{'repost': 1},
  }}
  onToggleReaction={() => console.log('test')}
/>
```
