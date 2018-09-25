AvatarGroup

```js
const users = [
  { name: 'Jaap Bakker', profileImage: 'https://randomuser.me/api/portraits/men/1.jpg'},
  { name: 'Sloan Humfrey', profileImage: 'https://randomuser.me/api/portraits/women/1.jpg'},
  { name: 'James Dean', profileImage: 'https://randomuser.me/api/portraits/men/3.jpg'},
];

<div style={{background: '#000', padding: '8px', borderRadius: '4px'}}>
  <AvatarGroup
    users={users}
    avatarSize={50}
  />
</div>
```