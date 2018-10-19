IconBadge is technically a wrapper that displays a badge with or without numbers on it's children.

```js
<IconBadge showNumber={true} unseen={3} hidden={false} />
```

You can also use it with your own custom icon:

```js
<IconBadge
  onClick={() => console.log('hellowo rld.')}
  showNumber={true}
  unseen={3}
  hidden={false}
>
  <div
    style={{
      width: 20,
      height: 20,
      borderRadius: '50%',
      backgroundColor: 'hotpink',
    }}
  />
</IconBadge>
```

Or with any other component:

```js
<IconBadge
  onClick={() => console.log('hellowo rld.')}
  showNumber={true}
  unseen={3}
  hidden={false}
>
  <Avatar circle size={25} />
</IconBadge>
```

Without numbers:

```js
<IconBadge
  onClick={() => console.log('hellowo rld.')}
  showNumber={false}
  unseen={3}
  hidden={false}
>
  <Avatar circle size={25} />
</IconBadge>
```
