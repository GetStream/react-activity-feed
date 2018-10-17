ImagePreviewer

```js
<ImagePreviewer
  imageUploads={[
    {
      id: '1',
      previewUri: 'https://placeimg.com/640/480/any',
      state: 'uploading',
    },
    { id: '2', url: 'https://placeimg.com/480/480/any', state: 'finished' },
    { id: '3', url: 'https://placeimg.com/100/100/any', state: 'failed' },
  ]}
  handleRemove={(id) => console.log('Removed image ' + id)}
  handleRetry={(id) => console.log('Retried image ' + id)}
  handleFiles={(files) => {
    console.log('Selected files');
    console.log(files);
  }}
/>
```
