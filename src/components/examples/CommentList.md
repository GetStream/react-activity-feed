CommentList

```js

const data = [
  {
    author: 'Matthew Garner',
    content: 'It was at that moment Amanda knew she was done',
    image: 'https://randomuser.me/api/portraits/men/86.jpg'
  },
  {
    author: 'Katherine Hughes',
    content: 'YES YES YES YES I LOVE THIS 😂😂😂😂😂😂',
    image: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    author: 'Clayton Ramirez',
    content: 'what did I just see this is straigh boss all the way through - a h m a z i n g 💦💦💦💦💦💦💦💦💦💦💦💦💦💦',
    image: 'https://randomuser.me/api/portraits/men/57.jpg'
  },
]

const renderCommentItem = ({author, content, image}) => {
  return <CommentItem image={image} author={author} content={content} />
}

<CommentList
  data={data}
  renderCommentItem={renderCommentItem}
/>
```