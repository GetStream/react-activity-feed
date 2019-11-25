```js
<StreamApp
  apiKey="fpwesm5u2evu"
  appId="64527"
  token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZXhhbXBsZS11c2VyIn0.cM6zFlcQ68qP2LLz-Y6fPeNglfOuwB2aeBUaQild1wg"
>
  <NotificationDropdown />
</StreamApp>
```

NotificationDropdown with custom Header, Footer and Icon:

```js
const Header = () => (
  <p style={{ margin: 0, padding: 0, backgroundColor: 'green' }}>Header</p>
);

const Footer = () => (
  <p style={{ margin: 0, padding: 0, backgroundColor: 'green' }}>Footer</p>
);

const Icon = () => (
  <img
    src="https://lh3.googleusercontent.com/S0wT3WlK6_Y8nKy71NEhfC57nPbLxTZkjox02PArpgZReRZ0RHPZ7ms2f8pIgTrcSAWH"
    style={{ width: '30px', height: '30px' }}
  />
);

<StreamApp
  apiKey="fpwesm5u2evu"
  appId="64527"
  token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZXhhbXBsZS11c2VyIn0.cM6zFlcQ68qP2LLz-Y6fPeNglfOuwB2aeBUaQild1wg"
>
  <NotificationDropdown
    Icon={<Icon />}
    Header={<Header />}
    Footer={<Footer />}
  />
</StreamApp>;
```
