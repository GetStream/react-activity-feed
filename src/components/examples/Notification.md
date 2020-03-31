Notification

```js
const activities = [
  {
    actor: {
      data: {
        name: 'Jacky Davidson',
        profileImage: 'https://randomuser.me/api/portraits/men/72.jpg',
      },
    },
    verb: 'like',
    object: {
      verb: 'post',
      attachments: {
        files: [],
        images: [
          'https://stream-cloud-uploads.imgix.net/images/41814/11e5d349-9d62-4b9b-b28f-520ce8aa8598.3356358479_a0e3ee8a05_b.jpg?s=467019eb0965b7a8633a93e0a2a362d2',
          'https://stream-cloud-uploads.imgix.net/images/41814/a5db2d18-1803-4300-906f-579af270edf1.3356358479_a0e3ee8a05_b.jpg?s=65db066cf45ee7895529725a8d478c14',
        ],
      },
      object:
        'https://stream-cloud-uploads.imgix.net/images/41814/a5db2d18-1803-4300-906f-579af270edf1.3356358479_a0e3ee8a05_b.jpg?s=65db066cf45ee7895529725a8d478c14',
      actor: {
        data: {
          name: 'Josh',
        },
      },
    },
    time: Date.now() - 1000000,
  },
  {
    actor: {
      data: {
        name: 'Jordan Belfair',
        profileImage: 'https://randomuser.me/api/portraits/women/72.jpg',
      },
    },
    verb: 'like',
    object: {
      verb: 'post',
    },
  },
  {
    actor: {
      data: {
        name: 'Jared Fault',
        profileImage: 'https://randomuser.me/api/portraits/women/7.jpg',
      },
    },
    verb: 'like',
    object: {
      verb: 'post',
    },
  },
];

const unreadGroup = {
  read: false,
  activities,
};

const readGroup = {
  read: true,
  activities,
};
<StreamApp
  apiKey="fpwesm5u2evu"
  appId="64527"
  token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZXhhbXBsZS11c2VyIn0.cM6zFlcQ68qP2LLz-Y6fPeNglfOuwB2aeBUaQild1wg"
>
  <React.Fragment>
    <Notification activityGroup={unreadGroup} />
    <Notification activityGroup={readGroup} />
  </React.Fragment>;
</StreamApp>
```
