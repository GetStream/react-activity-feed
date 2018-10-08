```js
const icons = {
  email:
    '<svg width="20" height="19" viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg"><path d="M19.99 7c0-.72-.37-1.35-.94-1.7L10 0 .95 5.3C.38 5.65 0 6.28 0 7v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2l-.01-10zM10 12L1.74 6.84 10 2l8.26 4.84L10 12z" fill="#A0B2B8" fill-rule="evenodd"/></svg>',
  contact:
    '<svg width="20" height="24" viewBox="0 0 20 24" xmlns="http://www.w3.org/2000/svg"><path d="M18 0H2v2h16V0zM2 24h16v-2H2v2zM18 4H2C.9 4 0 4.9 0 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 2.75c1.24 0 2.25 1.01 2.25 2.25s-1.01 2.25-2.25 2.25S7.75 10.24 7.75 9 8.76 6.75 10 6.75zM15 17H5v-1.5c0-1.67 3.33-2.5 5-2.5s5 .83 5 2.5V17z" fill="#A0B2B8" fill-rule="evenodd"/></svg>',
};

const activities = [
  {
    object: {
      type: 'email',
      actor: {
        name: 'Cindy Smith',
      },
      subject: 'Hello',
      content: 'Lispum',
      status: 'sent',
      clicks: '12',
      opens: '1',
    },
    verb: 'contact ',
    own_reactions: {},
    reaction_counts: {},
    timestamp: new Date() - 1000000000,
  },
  {
    object: {
      verb: 'tracked email',
      actor: {
        name: 'Cindy Smith',
      },
      subject: 'Hello',
      content: 'Lispum',
      status: 'sent',
      clicks: '12',
      opens: '1',
    },
    verb: 'email',
    own_reactions: {
      like: [{}],
    },
    reaction_counts: {
      like: 7,
      comment: 1,
    },
    timestamp: new Date(),
  },
  {
    object: {
      verb: 'tracked email',
      actor: {
        name: 'Cindy Smith',
      },
      subject: 'Hello',
      content: 'Lispum',
      status: 'sent',
      clicks: '12',
      opens: '1',
    },
    own_reactions: {},
    reaction_counts: {},
    timestamp: new Date() - 1000000000,
  },
  {
    object: {
      verb: 'tracked email',
      actor: {
        name: 'Cindy Smith',
      },
      subject: 'Hello',
      content: 'Lispum',
      status: 'sent',
      clicks: '12',
      opens: '1',
    },
    own_reactions: {},
    reaction_counts: {
      like: 13,
      comment: 1,
    },
    timestamp: new Date() - 3000000000,
  },
  {
    object: {
      verb: 'tracked email',
      actor: {
        name: 'Cindy Smith',
      },
      subject: 'Hello',
      content: 'Lispum',
      status: 'sent',
      clicks: '12',
      opens: '1',
    },
    verb: 'contact',
    own_reactions: {},
    reaction_counts: {},
    timestamp: new Date() - 8000000000,
  },
  {
    object: {
      verb: 'tracked email',
      actor: {
        name: 'Cindy Smith',
      },
      subject: 'Hello',
      content: 'Lispum',
      status: 'sent',
      clicks: '12',
      opens: '1',
    },
    own_reactions: {
      like: [{}],
    },
    reaction_counts: {},
    timestamp: new Date() - 113000000000,
  },
];

<B2BTimeline activities={activities} icons={icons} />;
```
