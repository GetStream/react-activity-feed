ImagePreviewer

```js
<ImagePreviewer
  images={[
    {
      id: '1',
      previewUri: 'https://placeimg.com/640/480/any',
      state: 'uploading',
    },
    { id: '2', url: 'https://placeimg.com/480/480/any', state: 'finished' },
    { id: '2', url: 'https://placeimg.com/100/100/any', state: 'failed' },
  ]}
  handleRemove={() => console.log('IconButton clicked')}
  placeholderButtonHandler={() => console.log('ThumbnailPlaceholder clicked')}
/>
```
