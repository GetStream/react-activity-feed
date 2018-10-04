Activity

```js
const activity = {
  actor: {
    data: {
      name: 'Nora Ferguson',
      profileImage: 'https://randomuser.me/api/portraits/women/72.jpg',
    }
  },
  verb: 'post',
  object: 'I just missed my train 😤',
  time: new Date(),
  reaction_counts: {
    'repost': 17,
    'like': 17,
    'comment': 17,
  },
};

const Footer = () => {
  return (
    <ActivityFooter activity={activity}/>
  );
}

<div style={{backgroundColor: '#f7f7f7f', padding: '8px'}}>
  <Activity
    activity={activity}
    Footer={Footer}
  />
</div>
```

#### Activity with attached image and hashtag

```js
const activity = {
  actor: {
    data: {
      name: 'Nora Ferguson',
      profileImage: 'https://randomuser.me/api/portraits/women/72.jpg',
    },
  },
  verb: 'post',
  object: 'Just came back from this hike! #Hiking #Madeira',
  image:
    'https://handluggageonly.co.uk/wp-content/uploads/2017/08/IMG_0777.jpg',
  time: new Date(),
};

<Activity activity={activity} />;
```

#### Activity with enriched URL

```js
const activity = {
  actor: {
    data: {
      name: 'Nora Ferguson',
      profileImage: 'https://randomuser.me/api/portraits/women/72.jpg',
    },
  },
  verb: 'post',
  object: 'Oh snap!',
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
  time: new Date(),
};

<Activity activity={activity} />;
```
