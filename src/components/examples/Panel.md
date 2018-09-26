### statusupdateform

```js
<Panel>
  <PanelHeading>
    <Title>New Post</Title>
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
        <div style={{marginRight: '32px', display: 'inline-block'}}><ImageUploadButton /></div>
        <EmojiPicker />
      </div>
      <Button buttonStyle="primary">Post</Button>
    </div>
  </PanelFooter>
</Panel>
```

### tracking leads

```js
<TimeHeader>June 2018</TimeHeader>

<Panel panelStyle="square">
  <PanelHeading closeButton={false}>
    <Avatar rounded size={30} />
    <svg width="19" height="8" viewBox="0 0 19 8" xmlns="http://www.w3.org/2000/svg"><path d="M19 4l-4-4v3H0v2h15v3z" fill="#02D4B1" fillRule="evenodd"/></svg>
    <Avatar rounded size={30} />
    <p style={{fontSize: 12}}>You sent a tracked email to <strong>Cindy Smith (cindy@example.com)</strong></p>
  </PanelHeading>
  <PanelContent>
      <Panel panelStyle="square">
        <PanelContent>
          <Title>Subject: Hello</Title>
            <p>Hi Cindy,<br/><br/>

  I hope I'm not bothering you. Could you please refer me to the person in charge of [something that's relevant to my product]?<br/><br/>

  Thanks for your time,<br/><br/>

  Tom</p>
        </PanelContent>
      </Panel>
    </PanelContent>
</Panel>
<TimeHeader>May 2018</TimeHeader>
<TimeHeader>April 2018</TimeHeader>


```