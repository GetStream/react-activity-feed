### statusupdateform

```js
<Panel>
  <PanelHeading>
    <Title>New Post</Title>
  </PanelHeading>
  <PanelContent>
    <div style={{ display: 'flex' }}>
      <div style={{ marginRight: '16px' }}>
        <Avatar size={50} circle />
      </div>
      <Textarea placeholder="Type your worthless opinion... " />
    </div>
  </PanelContent>
  <PanelFooter>
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <div style={{ marginRight: '32px', display: 'inline-block' }}>
          <ImageUploadButton />
        </div>
        <EmojiPicker />
      </div>
      <Button buttonStyle="primary">Post</Button>
    </div>
  </PanelFooter>
</Panel>
```
