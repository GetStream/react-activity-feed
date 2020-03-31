```js
const post = {
  object: {
    type: 'tracked email',
    subject: 'Hello',
    content: 'Lispum',
    status: 'sent',
    clicks: '12',
    opens: '1',
  },
  actor: {
    name: 'Cindy Smith',
    email: 'cindy@exmample.com',
    profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  verb: 'contact ',
  own_reactions: {
    like: [],
  },
  reaction_counts: {
    like: 13,
    comment: 1,
  },
  timestamp: new Date() - 1000000000,
};
<StreamApp
  apiKey="fpwesm5u2evu"
  appId="64527"
  token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZXhhbXBsZS11c2VyIn0.cM6zFlcQ68qP2LLz-Y6fPeNglfOuwB2aeBUaQild1wg"
>
  <B2BActivity activity={post} />;
</StreamApp>
```
