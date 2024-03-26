import React from 'react';
import { Box, chakra } from '@chakra-ui/react';

export const Logo = (props: any) => {
  return (
    <chakra.svg
      xmlns="http://www.w3.org/2000/svg"
      width="full"
      height="full"
      viewBox="0 0 475 475"
      sx={{
        '.squarel': {
          fillRule: 'evenodd',
          clipRule: 'evenodd',
          fill: 'transparent',
        },
        '.snek': {
          fill: 'currentColor',
        },
        '.arrows': {
          fill: 'currentColor',
        },
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
          stroke: none;
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
        fill: none; /* No fill initially */
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
          <rect width="100%" height="100%" fill="black" />
          <path
            d="M115.86,344.56c6.1,2.2,9.35,5.73,12.93,8.68,29.63,24.4,63.36,38.86,101.89,39.72,72.77,1.62,136.15-46.28,149.93-117.76,11.6-60.18-8.13-110.08-58.01-145.77-60.09-43-143.55-29.92-188.04,28.61-29.27,38.49-35.75,81.5-20.35,127.42,3.64,10.86,3.8,20.71-3.64,29.86-6.32,7.78-14.72,10.83-24.49,9.49-11.02-1.51-18.46-7.87-22.08-18.33-5.33-15.38-8.86-31.26-9.76-47.48-3.3-59.34,15.71-110.45,59.67-150.7,39.74-36.38,87.24-52.94,141.3-47.5,80.46,8.11,144.15,64.58,159.81,142.92,19.36,96.85-40.61,189.02-136.89,206.98-60.2,11.24-113.35-5.11-154.42-53.03-2.13-2.49-3.83-5.35-5.62-8.12-.72-1.11-1.11-2.43-2.25-5.01h0Z"
            fill="none" // Make the snake shape opaque in the mask
          />
        </mask>
        <clipPath className="heading-clippath" id="heading1-clippath">
          <text x="0" y="160px" fontSize="32px" fontWeight="bold">
            Ihre Idee
          </text>
        </clipPath>
        <clipPath className="heading-clippath" id="heading2-clippath">
          <text x="0" y="190px" fontSize="24px" fontWeight="bold">
            Unser Know-How
          </text>
        </clipPath>
        <clipPath className="dots-clippath" id="dot1-clippath">
          <text x="133px" y="160px" fontSize="32px" fontWeight="bold">
            .
          </text>
        </clipPath>
        <clipPath className="dots-clippath" id="dot2-clippath">
          <text x="197px" y="190px" fontSize="24px" fontWeight="bold">
            .
          </text>
        </clipPath>
        <clipPath className="dots-clippath" id="dot2-clippath">
          <text x="197px" y="190px" fontSize="24px" fontWeight="bold">
            .
          </text>
        </clipPath>
        <clipPath className="button-clippath" id="button-clippath">
          <rect
            x="2px"
            y="250px"
            rx="10"
            ry="10"
            width="50"
            height="20"
            stroke="black"
          />
          <rect
            x="60px"
            y="250px"
            rx="10"
            ry="10"
            width="50"
            height="20"
            stroke="black"
          />
        </clipPath>
        <mask id="hole">
          <rect width="100%" height="100%" fill="white" />
          <rect
            x="2px"
            y="250px"
            rx="10"
            ry="10"
            width="50"
            height="20"
            stroke="black"
          />
          <rect
            x="50px"
            y="250px"
            rx="10"
            ry="10"
            width="48"
            height="18"
            fill="black"
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
            fill="none"
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
              fill="none"
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
              fill="none"
              cx="214"
              cy="264"
              r="50"
            />
            <circle
              id="circle2"
              className="circles"
              stroke="#1A202C"
              strokeWidth="1"
              fill="none"
              cx="214"
              cy="264"
              r="50"
            />
            <path
              id="heart"
              className="heart"
              stroke="#f77f00"
              fill="none"
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
        <line
          id="heading1"
          x1="0"
          y1="0"
          x2="100%"
          y2="0"
          stroke="#1A202C"
          strokeWidth="100%"
          clipPath="url(#heading1-clippath)"
        />
        <line
          id="heading2"
          x1="0"
          y1="0"
          x2="100%"
          y2="0"
          stroke="#1A202C"
          strokeWidth="100%"
          clipPath="url(#heading2-clippath)"
        />
        <line
          id="dot1"
          x1="0"
          y1="0"
          x2="100%"
          y2="0"
          stroke="#f77f00"
          strokeWidth="100%"
          clipPath="url(#dot1-clippath)"
        />
        <line
          id="dot2"
          x1="0"
          y1="0"
          x2="100%"
          y2="0"
          stroke="#f77f00"
          strokeWidth="100%"
          clipPath="url(#dot2-clippath)"
        />
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
        <line
          id="button"
          x1="0"
          y1="100px"
          x2="100%"
          y2="100px"
          stroke="#f77f00"
          strokeWidth="100%"
          clipPath="url(#button-clippath)"
          //mask="url(#hole)"
        />
      </g>
    </chakra.svg>
  );
};

export default Logo;