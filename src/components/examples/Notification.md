Notification

```js

const activities = [
  {
    actor: {
      data: {
        name: 'Jaap Bakker',
        profileImage: 'https://placehold.it/100x100'
      }
    },
    verb: 'heart',
    object: {
      verb: 'heart'
    }
  }
];

<div style={{backgroundColor: '#f2f2f2', padding: '8px'}}>
  <Notification activities={activities}/>
</div>
```