import React from 'react';
import { Box, chakra } from '@chakra-ui/react';
import { useIntl } from 'react-intl';

import { splitAccentDot } from '../../utils/accent-dots';

export const Logo = (props: any) => {
  const intl = useIntl();

  // The two headings the animation draws are copy, not artwork: they come
  // from the message catalog and their accent dot is painted by a mask of
  // its own, so the terminator is split off the localized string.
  const [heading1, dot1] = splitAccentDot(
    intl.formatMessage({
      id: 'LogoHeadingIdea',
      defaultMessage: 'Ihre Idee.'
    })
  );
  const [heading2, dot2] = splitAccentDot(
    intl.formatMessage({
      id: 'LogoHeadingKnowHow',
      defaultMessage: 'Unser Know-How.'
    })
  );

  return (
    <chakra.svg
      xmlns="http://www.w3.org/2000/svg"
      width="full"
      height="full"
      viewBox="0 0 475 475"
      css={{
        '& .squarel': {
          fillRule: 'evenodd',
          clipRule: 'evenodd',
          fill: 'transparent'
        },

        '& .snek': {
          fill: 'currentColor'
        },

        '& .arrows': {
          fill: 'currentColor'
        }
      }}
      {...props}
    >
      <style>{`
      @keyframes draw {
        100% {
          stroke-dashoffset: 0;
        }
      }

      @keyframes erase {
        100% {
          stroke: transparent;
        }
      }

      @keyframes heartbeat {
        0% {
          transform: scale(1);
        }
        40% {
          transform: scale(1);
        }
        50% {
          transform: scale(0.8);
        }
        55% {
          transform: scale(0.9);
        }
        60% {
          transform: scale(0.7);
        }
      }

      @keyframes move-layer2 {
        100% {
          transform: translateX(250px) translateY(100px) scale(0.5);
        }
      }

      @keyframes move-circle1 {
        100% {
          transform: translateY(-50px);
        }
      }

      @keyframes move-circle2 {
        100% {
          transform: translateX(50px);
        }
      }

      @keyframes rotate-heart-wrap {
        100% {
          transform: translateX(5px) translateY(-8px) rotate(-45deg);
        }
      }

      @keyframes fill-heart {
        to {
          fill: #f77f00;
        }
      }

      @keyframes fill-snek {
        to {
          fill: #fff;
        }
      }

      .rect, .circles, .heart {
        stroke-dasharray: 1000;
        stroke-dashoffset: 1000;
      }

      #button-outline {
        stroke-dasharray: 130;
        stroke-dashoffset: 130;
        animation: draw 1s ease 14s forwards;
      }

      .rect {
        animation: draw 2s ease forwards, /* Drawing animation */
                   erase 1s ease 6s forwards; /* Remove drawing */
      }

      #layer2 {
        animation: move-layer2 1s 9s forwards; /* Movement animation after the first one finishes */
      }

      #circle1 {
        animation: draw 2s ease 1s forwards, /* Drawing animation */
                   erase 1s ease 6s forwards, /* Remove drawing */
                   move-circle1 1s 3s forwards; /* Movement animation after the first one finishes */
      }

      #circle2 {
        animation: draw 2s ease 1s forwards, /* Drawing animation */
                   erase 1s ease 6s forwards, /* Remove drawing */
                   move-circle2 1s 3s forwards; /* Movement animation after the first one finishes */
      }

      .heart-wrap {
        animation: rotate-heart-wrap 1s 4s forwards; /* Rotate animation with delay */
        transform-origin: center; /* Ensure rotation is around the center */
      }

      #heart {
        animation: draw 2s ease 5s forwards, /* Drawing animation with delay */
		               fill-heart 0s ease 6s forwards, /* Fill animation */
                   heartbeat 1s infinite 9s; /* Heartbeat animation */
        strokeWidth: 2;
        fill: transparent; /* No fill initially */
        transform-origin: center; /* Ensure heartbeat is around the center */
      }

      #snek-mask path {
        transform-origin: center;
        transform: rotate(-148deg);
        animation: fill-snek 0s ease 7s forwards; /* Fill animation */
      }

      #heading1 {
        stroke-dasharray: 1005; /* Circumference of the circle */
        stroke-dashoffset: 1005; /* Same as dash array to start with full offset */
        animation: draw 1s ease 10s forwards;
      }

      #heading2 {
        stroke-dasharray: 1005; /* Circumference of the circle */
        stroke-dashoffset: 1005; /* Same as dash array to start with full offset */
        animation: draw 1s ease 11s forwards;
      }

      #dot1 {
        stroke-dasharray: 1005; /* Circumference of the circle */
        stroke-dashoffset: 1005; /* Same as dash array to start with full offset */
        animation: draw 1s ease 10s forwards;
      }

      #dot2 {
        stroke-dasharray: 1005; /* Circumference of the circle */
        stroke-dashoffset: 1005; /* Same as dash array to start with full offset */
        animation: draw 1s ease 11s forwards;
      }

      #button {
        stroke-dasharray: 1005; /* Circumference of the circle */
        stroke-dashoffset: 1005; /* Same as dash array to start with full offset */
        animation: draw 1s ease 13s forwards;
      }

      #skeleton1 {
        stroke-dasharray: 1005; /* Circumference of the circle */
        stroke-dashoffset: 1005; /* Same as dash array to start with full offset */
        animation: draw 1s ease 12s forwards;
      }

      #skeleton2 {
        stroke-dasharray: 1005; /* Circumference of the circle */
        stroke-dashoffset: 1005; /* Same as dash array to start with full offset */
        animation: draw 1s ease 12s forwards;
      }

      .snek {
        transform-origin: center;
        transform: rotate(148deg);
        stroke-dasharray: 1005; /* Circumference of the circle */
        stroke-dashoffset: 1005; /* Same as dash array to start with full offset */
        animation: draw 2s ease 7s forwards;
      }
    `}</style>
      <defs>
        <mask id="snek-mask">
          <path
            d="M 67.96 315.77 C 10.57 175.42 137.60 29.35 285.30 68.14 373.68 90.97 432.59 181.50 415.78 270.48 402.01 355.71 318.60 420.34 232.48 411.24 191.57 407.79 152.52 388.78 125.35 358.75 124.20 357.60 124.61 356.08 125.35 354.93 126.50 354.19 128.06 354.19 128.80 354.93 157.49 380.80 195.39 395.24 232.89 395.61 329.29 397.14 403.53 305.11 379.03 213.06 366.41 162.87 324.72 121.78 273.83 110.75 225.24 99.73 170.89 117.99 138.75 156.78 106.60 194.42 97.80 249.95 117.70 295.20 129.95 328.31 82.88 347.69 67.96 315.77 Z"
            fill="transparent" // Make the snake shape opaque in the mask
          />
        </mask>
        <mask id="heading1-mask">
          <text x="0" y="160" fontSize="32" fontWeight="bold" fill="white">
            {heading1}
          </text>
        </mask>
        <mask id="heading2-mask">
          <text x="0" y="190" fontSize="24" fontWeight="bold" fill="white">
            {heading2}
          </text>
        </mask>
        <mask className="dots-mask" id="dot1-mask">
          <text x="0" y="160" fontSize="32" fontWeight="bold" fill="black">
            {heading1}
            <tspan fill="white">{dot1}</tspan>
          </text>
        </mask>
        <mask className="dots-mask" id="dot2-mask">
          <text x="0" y="190" fontSize="24" fontWeight="bold" fill="black">
            {heading2}
            <tspan fill="white">{dot2}</tspan>
          </text>
        </mask>
        <mask id="button-mask">
          {/* Nur der gefüllte Button. Der zweite zeichnet sich selbst,
              wie Rechteck, Kreise und Herz. */}
          <rect
            x="2"
            y="250"
            rx="6"
            ry="6"
            width="50"
            height="20"
            fill="white"
          />
        </mask>
      </defs>
      <g id="Ebene_1-2">
        <g id="layer1">
          <path
            id="Fill_1"
            className="squarel"
            d="M425.2,49.62C380.42,4.99,316.03,0,237.33,0S94.09,5.05,49.31,49.78,0,158.9,0,237.59s4.53,143.14,49.31,187.87c44.78,44.73,109.23,49.26,188.02,49.26s143.24-4.53,188.02-49.26c44.78-44.73,49.31-109.12,49.31-187.87,.05-78.8-4.58-143.29-49.46-187.97h0Z"
          />
        </g>
        <g id="layer2">
          <circle
            className="snek"
            cx="238"
            cy="238"
            r="160"
            fill="transparent"
            stroke="#1A202C"
            strokeWidth="54"
            strokeLinecap="round"
            mask="url(#snek-mask)"
          />
          <g className="heart-wrap">
            <rect
              id="rect"
              className="rect"
              stroke="#1A202C"
              strokeWidth="1"
              fill="transparent"
              x="164"
              y="214"
              width="100"
              height="100"
            />
            <circle
              id="circle1"
              className="circles"
              stroke="#1A202C"
              strokeWidth="1"
              fill="transparent"
              cx="214"
              cy="264"
              r="50"
            />
            <circle
              id="circle2"
              className="circles"
              stroke="#1A202C"
              strokeWidth="1"
              fill="transparent"
              cx="214"
              cy="264"
              r="50"
            />
            <path
              id="heart"
              className="heart"
              stroke="#f77f00"
              fill="transparent"
              d="M 264.00,214.00
               C 291.61,214.00 314.00,236.39 314.00,264.00
                 314.00,291.61 291.61,314.00 264.00,314.00
                 264.00,314.00 164.00,314.00 164.00,314.00
                 164.00,214.00 164.00,214.00 164.00,214.00
                 164.00,186.39 186.39,164.00 214.00,164.00
                 241.61,164.00 264.00,186.39 264.00,214.00"
            />
          </g>
          <polygon
            className="arrows"
            points="133.97 209.4 260.81 208.99 243.86 164.78 261.63 164.78 332.69 242.45 149.26 242.45 133.97 209.4"
          />
          <polygon
            className="arrows"
            points="350.66 281.29 223.83 281.7 240.77 325.91 223 325.91 151.94 248.24 335.38 248.24 350.66 281.29"
          />
        </g>
        <g mask="url(#heading1-mask)">
          <rect
            id="heading1"
            x="-10%"
            y="34%"
            width="100%"
            height="50%"
            fill="none"
            stroke="#1A202C"
            strokeLinecap="round"
            strokeWidth="10%"
          />
        </g>
        <g mask="url(#heading2-mask)">
          <rect
            id="heading2"
            x="-10%"
            y="41%"
            width="100%"
            height="50%"
            fill="none"
            stroke="#1A202C"
            strokeLinecap="round"
            strokeWidth="10%"
          />
        </g>
        <g mask="url(#dot1-mask)">
          <rect
            id="dot1"
            x="-10%"
            y="34%"
            width="100%"
            height="50%"
            fill="none"
            stroke="#f77f00"
            strokeLinecap="round"
            strokeWidth="10%"
          />
        </g>
        <g mask="url(#dot2-mask)">
          <rect
            id="dot2"
            x="-10%"
            y="41%"
            width="100%"
            height="50%"
            fill="none"
            stroke="#f77f00"
            strokeLinecap="round"
            strokeWidth="10%"
          />
        </g>
        <line
          id="skeleton1"
          x1="4px"
          y1="215px"
          x2="196px"
          y2="215px"
          stroke="#000"
          opacity={0.2}
          strokeLinecap="round"
          strokeWidth="8px"
        />
        <line
          id="skeleton2"
          x1="4px"
          y1="230px"
          x2="196px"
          y2="230px"
          stroke="#000"
          opacity={0.2}
          strokeLinecap="round"
          strokeWidth="8px"
        />
        {/* Der zweite Button als gezeichneter Umriss, eine Sekunde nach dem
          gefüllten. */}
        <rect
          id="button-outline"
          x="61"
          y="251"
          rx="5"
          ry="5"
          width="48"
          height="18"
          fill="none"
          stroke="#f77f00"
          strokeWidth="2"
        />

        <g mask="url(#button-mask)">
          <rect
            id="button"
            x="-10%"
            y="57%"
            width="100%"
            height="50%"
            fill="none"
            stroke="#f77f00"
            strokeLinecap="round"
            strokeWidth="10%"
          />
        </g>
      </g>
    </chakra.svg>
  );
};

export default Logo;
