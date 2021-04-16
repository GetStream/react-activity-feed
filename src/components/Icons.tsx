import React, { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

export enum Color {
  Active = '#0ba8e0',
  Inactive = '#7a8287',
}

export const ThumbsUpIcon = (props: IconProps) => (
  <svg
    className="raf-reaction-icon__image"
    data-icon="thumbs-up"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    {...props}
  >
    <path
      fill="currentColor"
      d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z"
    ></path>
  </svg>
);

export const RepostIcon = (props: IconProps) => (
  <svg
    className="raf-reaction-icon__image"
    data-icon="retweet"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 512"
    {...props}
  >
    <path
      fill="currentColor"
      d="M629.657 343.598L528.971 444.284c-9.373 9.372-24.568 9.372-33.941 0L394.343 343.598c-9.373-9.373-9.373-24.569 0-33.941l10.823-10.823c9.562-9.562 25.133-9.34 34.419.492L480 342.118V160H292.451a24.005 24.005 0 0 1-16.971-7.029l-16-16C244.361 121.851 255.069 96 276.451 96H520c13.255 0 24 10.745 24 24v222.118l40.416-42.792c9.285-9.831 24.856-10.054 34.419-.492l10.823 10.823c9.372 9.372 9.372 24.569-.001 33.941zm-265.138 15.431A23.999 23.999 0 0 0 347.548 352H160V169.881l40.416 42.792c9.286 9.831 24.856 10.054 34.419.491l10.822-10.822c9.373-9.373 9.373-24.569 0-33.941L144.971 67.716c-9.373-9.373-24.569-9.373-33.941 0L10.343 168.402c-9.373 9.373-9.373 24.569 0 33.941l10.822 10.822c9.562 9.562 25.133 9.34 34.419-.491L96 169.881V392c0 13.255 10.745 24 24 24h243.549c21.382 0 32.09-25.851 16.971-40.971l-16.001-16z"
    ></path>
  </svg>
);

export const CommentIcon = (props: IconProps) => (
  <svg
    className="raf-reaction-icon__image"
    data-icon="comment"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    {...props}
  >
    <path
      fill="currentColor"
      d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z"
    ></path>
  </svg>
);

export const AvatarIcon = (props: IconProps) => (
  <svg
    enableBackground="new 312.809 0 401 401"
    version="1.1"
    viewBox="312.809 0 401 401"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g transform="matrix(1.223 0 0 1.223 -467.5 -843.44)">
      <rect x="601.45" y="653.07" width="401" height="401" fill="#E4E6E7" />
      <path
        d="m802.38 908.08c-84.515 0-153.52 48.185-157.38 108.62h314.79c-3.87-60.44-72.9-108.62-157.41-108.62z"
        fill="#AEB4B7"
      />
      <path
        d="m881.37 818.86c0 46.746-35.106 84.641-78.41 84.641s-78.41-37.895-78.41-84.641 35.106-84.641 78.41-84.641c43.31 0 78.41 37.9 78.41 84.64z"
        fill="#AEB4B7"
      />
    </g>
  </svg>
);

export const CloseIcon = (props: IconProps) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <defs>
      <path
        d="M465 5c5.53 0 10 4.47 10 10s-4.47 10-10 10-10-4.47-10-10 4.47-10 10-10zm3.59 5L465 13.59 461.41 10 460 11.41l3.59 3.59-3.59 3.59 1.41 1.41 3.59-3.59 3.59 3.59 1.41-1.41-3.59-3.59 3.59-3.59-1.41-1.41z"
        id="b"
      />
      <filter x="-30%" y="-30%" width="160%" height="160%" filterUnits="objectBoundingBox" id="a">
        <feOffset in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" in="shadowBlurOuter1" />
      </filter>
    </defs>
    <g transform="translate(-451 -1)" fillRule="nonzero" fill="none">
      <use fill="#000" filter="url(#a)" xlinkHref="#b" />
      <use fill="#FFF" fillRule="evenodd" xlinkHref="#b" />
    </g>
  </svg>
);

export const EmojiIcon = (props: IconProps) => (
  <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M10 15.498c2.33 0 4.304-1.456 5.106-3.5H4.892c.802 2.044 2.777 3.5 5.107 3.5zm-3.5-6.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm7 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-3.5 9a8 8 0 0 1-8-8 8 8 0 0 1 8-8 8 8 0 0 1 8 8 8 8 0 0 1-8 8zm-.006-18C4.467-.002 0 4.475 0 9.998s4.468 10 9.995 10c5.526 0 10.005-4.477 10.005-10s-4.479-10-10.005-10z"
      fill="#A0B2B8"
      fillRule="nonzero"
    />
  </svg>
);

export const BellIcon = (props: IconProps) => (
  <svg width="17" height="20" viewBox="0 0 17 20" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M8.5 20c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6.5-6V8.5c0-3.07-2.13-5.64-5-6.32V1.5C10 .67 9.33 0 8.5 0S7 .67 7 1.5v.68c-2.87.68-5 3.25-5 6.32V14l-2 2v1h17v-1l-2-2zm-2 1H4V8.5C4 6.01 6.01 4 8.5 4S13 6.01 13 8.5V15z"
      fillRule="evenodd"
    />
  </svg>
);
