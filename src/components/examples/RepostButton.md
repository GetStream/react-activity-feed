```js
<RepostButton
  // this is just a mock of the data to render the example
  activity={{
    own_reactions: {'repost': [1]},
    reaction_counts:{'repost': 7},
  }}
  onToggleReaction={() => console.log('test')}
/>

<RepostButton
  // this is just a mock of the data to render the example
  activity={{
    reaction_counts:{'repost': 1},
  }}
  onToggleReaction={() => console.log('test')}
/>
```
