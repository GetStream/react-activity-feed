RetweetButton

```js
<RetweetButton
  // this is just a mock of the data to render the example
  activity={{
    own_reactions: {'retweet': [1]},
    reaction_counts:{'retweet': 7},
  }}
  onToggleReaction={() => console.log('test')}
/>

<RetweetButton
  // this is just a mock of the data to render the example
  activity={{
    reaction_counts:{'retweet': 1},
  }}
  onToggleReaction={() => console.log('test')}
/>
```