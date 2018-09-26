/* global process */
// @flow

const stream = require('getstream');
const faker = require('faker');

const dotenv = require('dotenv');
dotenv.config();

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
  console.log(apiSecret);
  const client = stream.connect(
    apiKey,
    apiSecret,
  );
  const exampleUserId = 'example-user';
  const users = getUsers();
  await client.collections.upsert('user', users);
  const timeline = client.feed('timeline', exampleUserId);
  const acts = getActivities(client, users);
  await timeline.addActivities(acts);
  const token = client.createUserSessionToken(exampleUserId);
  console.log(`apiKey="${apiKey}"`);
  console.log(`appId="${appId}"`);
  console.log(`token="${token}"`);
}

const getUsers = (n = 10) => {
  console.log('getting users');
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
    actor: client.collections.createUserReference(users[0].id),
    verb: 'post',
    object:
      "I just realized that I've met of fan of every team in the #NFL in real life...except a Jaguars fan. I've never had a real encounter with one...💁",
  },
  {
    actor: client.collections.createUserReference(users[1].id),
    verb: 'reply',
    object: 'sad, I wanted drama',
    image: 'https://pbs.twimg.com/media/DlD9f0-XgAAD_rU.jpg',
  },
  {
    actor: client.collections.createUserReference(users[2].id),
    verb: 'post',
    object: 'I enjoyed watching this',
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
    actor: client.collections.createUserReference(users[3].id),
    verb: 'post',
    object: 'I just missed my train 😤',
  },
  {
    actor: client.collections.createUserReference(users[4].id),
    verb: 'post',
    object: 'I totally agree!',
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
    actor: client.collections.createUserReference(users[5].id),
    verb: 'post',
    object: 'Oh snap',
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
    actor: client.collections.createUserReference(users[6].id),
    verb: 'post',
    object: "@ken let's get coffee one these days ☕",
  },
];

main();
