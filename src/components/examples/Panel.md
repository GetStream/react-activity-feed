```js
<Panel>
  <PanelHeading>
    New Post
  </PanelHeading>
  <PanelContent>
    <div style={{display: 'flex'}}>
      <div style={{marginRight: '16px'}}>
        <Avatar size={50} circle />
      </div>
      <Textarea placeholder="Type your worthless opinion... "/>
    </div>

  </PanelContent>
  <PanelFooter>
    <div style={{display: 'flex'}}>
      <div style={{flex: 1}}>
        <EmojiPicker />
      </div>
      <Button buttonStyle="primary">Post</Button>
    </div>
  </PanelFooter>
</Panel>
```