```js
<IconBadge showNumber={true} unseen={3} hidden={false} />
```

You can also use it with your own custom icon

```js
<IconBadge
  onClick={() => console.log('hellowo rld.')}
  showNumber={true}
  unseen={3}
  hidden={false}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-download"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
</IconBadge>
```
