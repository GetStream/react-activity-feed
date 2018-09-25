AttachedActivity

```js

const activity = {
  actor: {
    data: {
      name: 'Jaap Bakker',
      profileImage: 'https://randomuser.me/api/portraits/men/72.jpg'
    }
  },
  verb: 'heart',
  object: {
    verb: 'post',
    author: 'Dean Blunt',
    content: 'hello world'
  }
};

<div style={{background:'#000', padding: '16px'}}>
  <AttachedActivity
    activity={activity.object} />
</div>

```