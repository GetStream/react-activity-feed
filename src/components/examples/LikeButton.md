LikeButton

```js
<LikeButton
    // this is just a mock of the data to render the example
    activity={{
        own_reactions: {'like': [1]},
        reaction_counts:{'like': 7},
    }}
    onToggleReaction={() => console.log('test')}
/>

<LikeButton
    // this is just a mock of the data to render the example
    activity={{
        reaction_counts:{'like': 0},
    }}
    onToggleReaction={() => console.log('test')}
/>
```