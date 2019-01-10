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
      object:
        'https://www.gettyimages.com/gi-resources/images/CreativeLandingPage/HP_Sept_24_2018/CR3_GettyImages-159018836.jpg',
      attachments: {
        files: [],
        images: [
          'https://stream-cloud-uploads.imgix.net/images/41814/cb181b8b-f31b-42ba-bf80-1ecf11da7522.img_lights.jpg?s=faf13a60401aa332f79ca8df5e9e156a',
        ],
      },
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
    object:
      'https://www.gettyimages.com/gi-resources/images/CreativeLandingPage/HP_Sept_24_2018/CR3_GettyImages-159018836.jpg',
  },
  {
    actor: {
      data: {
        name: 'Jared Fault',
        profileImage: 'https://randomuser.me/api/portraits/women/7.jpg',
      },
    },
    verb: 'like',
    object:
      'https://www.gettyimages.com/gi-resources/images/CreativeLandingPage/HP_Sept_24_2018/CR3_GettyImages-159018836.jpg',
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

<React.Fragment>
  <Notification activityGroup={unreadGroup} />
  <Notification activityGroup={readGroup} />
</React.Fragment>;
```
