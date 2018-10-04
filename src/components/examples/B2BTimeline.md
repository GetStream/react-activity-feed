```js
const activities = [
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
    reaction_counts: {},
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
    own_reactions: {},
    reaction_counts: {},
    timestamp: new Date() - 113000000000,
  },
];

<B2BTimeline activities={activities} />;
```
