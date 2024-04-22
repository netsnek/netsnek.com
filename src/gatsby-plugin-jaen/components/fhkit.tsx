import React from 'react'

import {Box, HTMLChakraProps, chakra} from '@chakra-ui/react'

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
          fill: '#000000'
        },
        '.k': {
          fill: '#FFFFFF'
        }
      }}
      {...props}>
      <g id="Ebene_1-2">
        <g id="layer1">
          <path
            id="Fill_1"
            className="squarel"
            d="M425.2,49.62C380.42,4.99,316.03,0,237.33,0S94.09,5.05,49.31,49.78,0,158.9,0,237.59s4.53,143.14,49.31,187.87c44.78,44.73,109.23,49.26,188.02,49.26s143.24-4.53,188.02-49.26c44.78-44.73,49.31-109.12,49.31-187.87,.05-78.8-4.58-143.29-49.46-187.97h0Z"
          />
        </g>
        <path
          className="k"
          d="M 382.43,91.02
          C 372.91,91.74 296.00,118.75 255.70,150.80
            255.75,150.50 214.50,181.50 175.74,224.04
            121.25,283.50 92.29,372.66 91.56,382.75
            98.95,378.71 142.25,301.75 210.21,229.37
            278.17,157.00 382.43,91.02 382.43,91.02 Z
          M 338.80,241.63
          C 320.61,241.63 273.99,261.27 273.99,261.27
            258.46,268.48 223.30,284.86 210.50,294.75
            206.12,298.14 177.50,338.00 177.50,338.00
            177.50,338.00 198.64,329.99 205.25,326.50
            205.25,326.50 242.85,306.00 246.24,306.58
            248.86,307.03 259.86,316.72 263.66,319.18
            263.66,319.18 324.59,364.81 342.76,364.96
            339.56,352.26 259.47,293.80 259.47,293.80
            259.47,293.80 337.47,247.55 337.47,247.55
            346.25,242.25 338.80,241.63 338.80,241.63 Z"
        />
      </g>
    </chakra.svg>
  )
}

export const FHKITIcon: React.FC<HTMLChakraProps<'svg'>> = props => {
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
          fill: '#000000'
        },
        '.k': {
          fill: '#FFFFFF'
        }
      }}
      {...props}>
      <g id="Ebene_1-2">
        <path
          fill="currentColor"
          d="M 382.43,91.02
        C 372.91,91.74 296.00,118.75 255.70,150.80
          255.75,150.50 214.50,181.50 175.74,224.04
          121.25,283.50 92.29,372.66 91.56,382.75
          98.95,378.71 142.25,301.75 210.21,229.37
          278.17,157.00 382.43,91.02 382.43,91.02 Z
        M 338.80,241.63
        C 320.61,241.63 273.99,261.27 273.99,261.27
          258.46,268.48 223.30,284.86 210.50,294.75
          206.12,298.14 177.50,338.00 177.50,338.00
          177.50,338.00 198.64,329.99 205.25,326.50
          205.25,326.50 242.85,306.00 246.24,306.58
          248.86,307.03 259.86,316.72 263.66,319.18
          263.66,319.18 324.59,364.81 342.76,364.96
          339.56,352.26 259.47,293.80 259.47,293.80
          259.47,293.80 337.47,247.55 337.47,247.55
          346.25,242.25 338.80,241.63 338.80,241.63 Z"
        />
      </g>
    </chakra.svg>
  )
}

export default Logo