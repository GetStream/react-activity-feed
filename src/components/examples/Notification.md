Notification

```js

const activities = [
  {
    actor: {
      data: {
        name: 'Jaap Bakker',
        profileImage: 'https://randomuser.me/api/portraits/men/72.jpg'
      }
    },
    verb: 'follow',
    object: {
      verb: 'post',
      content: 'Winds 2 is the Open Source megalocosmos flat earth effect of anti-gravity food chemicals...',
      author: 'Josh'
    },
    time: Date.now() - 1000000
  },
  {
    actor: {
      data: {
        name: 'Jaap Bakker',
        profileImage: 'https://randomuser.me/api/portraits/women/72.jpg'
      }
    },
    verb: 'heart',
    object: {
      verb: 'post'
    }
  }
];

<div style={{backgroundColor: '#f2f2f2', padding: '8px'}}>
  <Notification activities={activities}/>
</div>
```