CommentList

```js
const data = [
  {
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
  },
  {
    user: {
      data: {
        name: 'Dean',
        subtitle: 'Woah, livin\' on a prayer ',
        profileImage: 'https://randomuser.me/api/portraits/men/20.jpg',
      }
    },
    data: {
      text: 'Wakeboarding is awesome!'
    }
  }
];

const renderCommentItem = (comment, i) => {
  return <CommentItem comment={comment} key={`CommentItem-${i}`} />
}

<CommentList
  data={data}
  renderCommentItem={renderCommentItem}
/>
```
