import { Box } from '@chakra-ui/react';
import { FC, useMemo } from 'react';

/**
 * The falling glyph curtain from the film, as plain SVG plus CSS animation.
 *
 * It is a backdrop, so it carries no canvas, no timer and no dependency of
 * its own. One <g> per column is the only thing that moves, and it moves on
 * transform alone, so the browser never relayouts while it rains.
 *
 * The layout is derived from the column index through an integer hash, never
 * from Math.random. Server and client therefore emit byte identical markup
 * and React has nothing to complain about on hydration.
 */

// Half width katakana are the glyphs the film uses, and unlike the full width
// forms they sit in a single cell of the grid. Digits break up the run so the
// curtain does not read as one uniform texture.
const GLYPHS = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ0123456789'.split('');

/** Column pitch and line height in user units. */
const CELL = 16;
const FONT_SIZE = 13;
/** Strand length in glyphs. */
const MIN_LEN = 6;
const MAX_LEN = 14;

/**
 * A 32 bit integer mix. Same input, same output, on every machine that runs
 * this file, which is what keeps the markup stable between render passes.
 */
const hash = (n: number): number => {
  let h = (n + 0x9e3779b9) >>> 0;
  h = Math.imul(h ^ (h >>> 16), 0x21f0aaad) >>> 0;
  h = Math.imul(h ^ (h >>> 15), 0x735a2d97) >>> 0;
  return (h ^ (h >>> 15)) >>> 0;
};

/** Hash of an index and a salt, folded into the unit interval. */
const unit = (i: number, salt: number, seed: number): number =>
  hash(i * 0x27d4eb2d + salt * 0x165667b1 + seed * 0x9e3779b1) / 4294967296;

/** Hash of an index and a salt, folded into 0 .. n - 1. */
const pick = (i: number, salt: number, seed: number, n: number): number =>
  hash(i * 0x2545f491 + salt * 0x85ebca6b + seed * 0xc2b2ae35) % n;

interface Glyph {
  char: string;
  /** Baseline above the head of the strand, so the head sits at 0. */
  y: number;
  opacity: number;
}

interface Strand {
  x: number;
  duration: number;
  /** Negative, so the columns start out of step instead of in a row. */
  delay: number;
  /** Resting place used when the visitor asks for reduced motion. */
  parkY: number;
  glyphs: Glyph[];
}

interface Layout {
  width: number;
  height: number;
  fromY: number;
  toY: number;
  strands: Strand[];
}

const buildLayout = (
  columns: number,
  rows: number,
  speed: number,
  seed: number
): Layout => {
  const width = columns * CELL;
  const height = rows * CELL;
  const tailPx = MAX_LEN * CELL;

  // The head enters at the top edge and the trail follows it in. The travel
  // reaches past the bottom by a full tail plus a bit of slack, so a column
  // stands empty for a while before its next drop, exactly as it does in the
  // film. Both ends are shared by every strand, so a single keyframe pair
  // drives all of them and only the duration tells them apart.
  const fromY = 0;
  const toY = height + tailPx + Math.round(height * 0.6);

  const strands: Strand[] = [];

  for (let i = 0; i < columns; i++) {
    const len =
      MIN_LEN + (hash(i * 0x9e3779b1 + seed) % (MAX_LEN - MIN_LEN + 1));

    // 0.6 to 1.7 of the base pace. Wide enough that two neighbours never read
    // as a pair, narrow enough that nothing races out of the frame.
    const pace = 0.6 + unit(i, 11, seed) * 1.1;
    const duration = (7 / speed) * (1 / pace);
    const delay = -unit(i, 23, seed) * duration;
    const parkY = Math.round(height * 0.25 + unit(i, 37, seed) * height * 0.85);

    // Whole columns sit further back than others. Without that the curtain
    // is flat and every drop claims the same attention.
    const dim = 0.35 + unit(i, 53, seed) * 0.65;

    const glyphs: Glyph[] = [];

    for (let j = 0; j < len; j++) {
      const fade = Math.pow(1 - j / len, 1.5);

      glyphs.push({
        char: GLYPHS[pick(i * 64 + j, 7, seed, GLYPHS.length)],
        y: -j * CELL,
        opacity: j === 0 ? 0.7 + dim * 0.3 : Math.max(0.05, fade * dim)
      });
    }

    strands.push({
      x: i * CELL + CELL / 2,
      duration,
      delay,
      parkY,
      glyphs
    });
  }

  return { width, height, fromY, toY, strands };
};

export interface MatrixRainProps {
  /** Number of columns, and with it the density of the curtain. */
  columns?: number;
  /** Number of glyph rows the viewBox is tall. */
  rows?: number;
  /** Multiplier on the fall, 2 is twice as fast. */
  speed?: number;
  /** Colour of the trail. */
  color?: string;
  /** Colour of the leading glyph. */
  headColor?: string;
  /** Ground behind the glyphs, pass transparent to keep the parent's. */
  background?: string;
  /** Opacity of the whole curtain, so it stays behind the foreground. */
  opacity?: number;
  /** Changes the glyphs and the timing without touching anything else. */
  seed?: number;
}

const MatrixRain: FC<MatrixRainProps> = ({
  columns = 40,
  rows = 18,
  speed = 1,
  color = '#f77f00',
  headColor = '#ffe0b0',
  background = '#0A0A0A',
  opacity = 0.45,
  seed = 1
}) => {
  const layout = useMemo(
    () => buildLayout(columns, rows, speed, seed),
    [columns, rows, speed, seed]
  );

  // The geometry is baked into the name, so two curtains of different height
  // on one page cannot overwrite each other's keyframes.
  const animationName = `netsnekMatrixFall-${layout.fromY}-${layout.toY}`;

  return (
    <Box
      aria-hidden="true"
      position="absolute"
      inset="0"
      overflow="hidden"
      pointerEvents="none"
      userSelect="none"
      css={{
        [`@keyframes ${animationName}`]: {
          '0%': { transform: `translateY(${layout.fromY}px)` },
          '100%': { transform: `translateY(${layout.toY}px)` }
        },

        '& .matrix-rain-strand': {
          animationName,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          willChange: 'transform'
        },

        '& @media (prefers-reduced-motion: reduce)': {
          '.matrix-rain-strand': { animation: 'none' }
        }
      }}
    >
      <svg
        viewBox={`0 0 ${layout.width} ${layout.height}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <rect
          x="0"
          y="0"
          width={layout.width}
          height={layout.height}
          fill={background}
        />

        <g
          opacity={opacity}
          fill={color}
          fontFamily="'Noto Sans Mono CJK JP', 'Courier New', ui-monospace, monospace"
          fontSize={FONT_SIZE}
          textAnchor="middle"
        >
          {layout.strands.map((strand, i) => (
            <g
              key={i}
              className="matrix-rain-strand"
              transform={`translate(0 ${strand.parkY})`}
              style={{
                animationDuration: `${strand.duration.toFixed(3)}s`,
                animationDelay: `${strand.delay.toFixed(3)}s`
              }}
            >
              <text>
                {strand.glyphs.map((glyph, j) => (
                  <tspan
                    key={j}
                    x={strand.x}
                    y={glyph.y}
                    fill={j === 0 ? headColor : undefined}
                    fillOpacity={Number(glyph.opacity.toFixed(3))}
                  >
                    {glyph.char}
                  </tspan>
                ))}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </Box>
  );
};

export default MatrixRain;
