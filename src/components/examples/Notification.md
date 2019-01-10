Notification

```js
const activities = [
  {
    actor: {
      data: {
        name: 'Jacky Davidson',
        profileImage: 'https://randomuser.me/api/portraits/men/72.jpg',
      },
    },
    verb: 'like',
    object: {
      verb: 'post',
      object:
        'Winds 2 is the Open Source megalocosmos flat earth effect of anti-gravity food chemicals...',
      actor: {
        data: {
          name: 'Josh',
        },
      },
    },
    time: Date.now() - 1000000,
  },
  {
    actor: {
      data: {
        name: 'Jordan Belfair',
        profileImage: 'https://randomuser.me/api/portraits/women/72.jpg',
      },
    },
    verb: 'like',
    object: {
      verb: 'post',
    },
  },
  {
    actor: {
      data: {
        name: 'Jared Fault',
        profileImage: 'https://randomuser.me/api/portraits/women/7.jpg',
      },
    },
    verb: 'like',
    object: {
      verb: 'post',
    },
  },
];

const unreadGroup = {
  read: false,
  activities,
};

const readGroup = {
  read: true,
  activities,
};

<React.Fragment>
  <Notification activityGroup={unreadGroup} />
  <Notification activityGroup={readGroup} />
</React.Fragment>;
```
