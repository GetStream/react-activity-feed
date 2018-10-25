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

<B2BActivity activity={post} />;
```
