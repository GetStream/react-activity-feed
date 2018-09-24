CommentItem

```js
const comment = {
  user: {
    data: {
      name: 'Rosemary',
      subtitle: 'likes playing fresbee in the park',
      profileImage: 'https://randomuser.me/api/portraits/women/20.jpg',
    }
  },
  data: {
    text: 'Snowboarding is awesome!'
  }
};

<CommentItem
  comment={comment}
/>
```