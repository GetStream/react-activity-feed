/* global process */

const stream = require('getstream');
const faker = require('faker');

const dotenv = require('dotenv');
dotenv.config();

const exampleUserId = 'example-user';

async function main() {
  const apiKey = process.env.STREAM_API_KEY;
  const apiSecret = process.env.STREAM_API_SECRET;
  const appId = process.env.STREAM_APP_ID;
  if (!apiKey) {
    console.error('STREAM_API_KEY should be set');
    return;
  }

  if (!appId) {
    console.error('STREAM_APP_ID should be set');
    return;
  }

  if (!apiSecret) {
    console.error('STREAM_SECRET should be set');
    return;
  }
  const client = stream.connect(apiKey, apiSecret);

  const exampleUser = client.user(exampleUserId);
  const userFeed = client.feed('user', exampleUserId);
  const act = await userFeed.addActivity({
    actor: exampleUser,
    verb: 'post',
    object:
      'Winds 2 is the Open Source megalocosmos flat earth effect of anti-gravity food chemicals...',
  });
  const users = getUsers();
  const acts = getActivities(client, users);
  const b2bActs = getB2BActivities(client, users);
  const notificationActs = getNotifications(client, users, act);
  const timeline = client.feed('timeline', exampleUserId);
  const b2btimeline = client.feed('b2btimeline', exampleUserId);
  const notification = client.feed('notification', exampleUserId);

  await client.collections.upsert('user', users);
  await client.collections.upsert('user', [
    {
      id: exampleUserId,
      name: 'Curious Dev',
    },
  ]);
  await timeline.addActivities(acts);
  await b2btimeline.addActivities(b2bActs);
  await notification.addActivities(notificationActs);

  const token = client.createUserToken(exampleUserId);
  console.log(`apiKey="${apiKey}"`);
  console.log(`appId="${appId}"`);
  console.log(`token="${token}"`);
}

const getUsers = (n = 10) => {
  const users = [];
  for (let i = 0; i < n; i++) {
    users.push({
      id: `test-user-${i}`,
      name: faker.name.findName(),
      profileImage: faker.internet.avatar(),
      desc: faker.lorem.sentence(),
    });
  }
  return users;
};

const getActivities = (client, users) => [
  {
    actor: client.user(users[0].id),
    verb: 'post',
    object:
      "I just realized that I've met of fan of every team in the #NFL in real life...except a Jaguars fan. I've never had a real encounter with one...💁",
    foreign_id: 'post:1',
    time: '2018-10-30T13:49:50',
  },
  {
    actor: client.user(users[1].id),
    verb: 'reply',
    object: 'sad, I wanted drama',
    time: '2018-10-29T13:49:50',
    image:
      'https://images.unsplash.com/photo-1516544820488-4a99efa70a58?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0ff2b499992b568b957a0a9636540ed2&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb',
    foreign_id: 'post:2',
  },
  {
    actor: client.user(users[2].id),
    verb: 'post',
    object: 'I enjoyed watching this',
    foreign_id: 'post:3',
    time: '2018-10-28T13:49:50',
    attachments: {
      og: {
        description:
          'Serial entrepreneur Elon Musk wants to fundamentally change the way we live. But his path to success has been characterized by both great accomplishments and flirtations with failure.',
        title: 'Elon Musk’s Highs and Lows: PayPal, SpaceX, Tesla',
        url:
          'https://www.nytimes.com/video/business/100000006060092/elon-musk-tesla-spacex.html',
        images: [
          {
            image:
              'https://static01.nyt.com/images/2018/08/22/us/19xp-musk-vid-2/19xp-musk-vid-2-videoSixteenByNine1050.jpg',
          },
        ],
      },
    },
  },
  {
    actor: client.user(users[3].id),
    verb: 'post',
    object: 'I just missed my train 😤',
    foreign_id: 'post:4',
    time: '2018-10-27T13:49:50',
  },
  {
    actor: client.user(users[4].id),
    verb: 'post',
    object: 'I totally agree!',
    foreign_id: 'post:5',
    time: '2018-10-26T13:49:50',
    attachments: {
      og: {
        description:
          'Why choose one when you can wear both? These energizing pairings stand out from the crowd',
        title: 'How to Pair Neutrals and Bright Colors',
        url:
          'https://graphics.wsj.com/glider/marketreport-4a039902-7e0d-4631-ab83-6cc1931c1bc6',
        images: [{ image: 'https://images.wsj.net/im-21927/TOP' }],
      },
    },
  },
  {
    actor: client.user(users[5].id),
    verb: 'post',
    object: 'Oh snap',
    foreign_id: 'post:6',
    time: '2018-10-25T13:49:50',
    attachments: {
      og: {
        description:
          'Why choose one when you can wear both? These energizing pairings stand out from the crowd',
        title:
          "'Queen' rapper rescheduling dates to 2019 after deciding to &#8220;reevaluate elements of production on the 'NickiHndrxx Tour'",
        url:
          'https://www.rollingstone.com/music/music-news/nicki-minaj-cancels-north-american-tour-with-future-714315/',
        images: [
          {
            image:
              'https://www.rollingstone.com/wp-content/uploads/2018/08/GettyImages-1020376858.jpg',
          },
        ],
      },
    },
  },
  {
    actor: client.user(users[6].id),
    verb: 'post',
    object: "@ken let's get coffee one these days ☕",
    foreign_id: 'post:7',
    time: '2018-10-24T13:49:50',
  },
];

const getB2BActivities = (client, users) => [
  {
    actor: client.user(users[5].id),
    verb: 'emailed',
    object: '56 New Contacts',
    time: '2017-10-24T13:49:50',
  },
  {
    actor: client.user(users[6].id),
    verb: 'send',
    object: 'email',
    email: {
      type: 'tracked email',
      subject: 'Hello',
      content: 'Lispum',
      status: 'sent',
      clicks: '12',
      opens: '1',
    },
    time: '2018-10-24T13:49:50',
  },
  {
    actor: client.user(users[4].id),
    verb: 'congratulations',
    object: 'card',
    card: {
      title: 'Congratulations!',
      text: 'The email campaign Smells like Coffee just had 10,000 opens!',
      image: 'https://placeimg.com/300/300',
      stats: {
        deliveries: 30054,
        bounces: 0,
        unsubscribes: 0,
        'spam reports': 0,
      },
    },
  },
  {
    actor: client.user(users[7].id),
    verb: 'changed to',
    object: 'customer',
    time: '2018-06-24T13:49:50',
  },

  {
    actor: client.user(users[8].id),
    verb: 'changed to',
    object: 'lead',
    time: '2018-02-24T13:49:50',
  },
  {
    actor: client.user(users[9].id),
    verb: 'added by',
    object: 'offline app',
    time: '2017-10-24T13:49:50',
  },
  {
    actor: client.user(users[0].id),
    verb: 'added',
    object: 'project',
    project: {
      title: 'Loyalty Email',
    },
    attachments: {
      images: [
        'https://placeimg.com/300/400/people',
        'https://placeimg.com/400/400/people',
        'https://placeimg.com/200/400/people',
        'https://placeimg.com/550/400/people',
        'https://placeimg.com/300/223/people',
        'https://placeimg.com/300/223/people',
      ],
    },
  },
];

const getNotifications = (client, users, activity) => {
  const ref = (i) => client.user(users[i].id);
  const exampleRef = client.user(exampleUserId);
  const activityRef = `SA:${activity.id}`;
  return [
    {
      actor: ref(0),
      verb: 'follow',
      object: exampleRef,
    },
    {
      actor: ref(1),
      verb: 'follow',
      object: exampleRef,
    },
    {
      actor: ref(2),
      verb: 'follow',
      object: exampleRef,
    },
    {
      actor: ref(3),
      verb: 'follow',
      object: exampleRef,
    },
    {
      actor: ref(5),
      verb: 'like',
      object: activityRef,
    },
    {
      actor: ref(6),
      verb: 'like',
      object: activityRef,
    },
    {
      actor: ref(7),
      verb: 'like',
      object: activityRef,
    },
    {
      actor: ref(8),
      verb: 'like',
      object: activityRef,
    },
  ];
};

main();
