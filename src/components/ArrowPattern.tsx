import { useEffect, useId, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { chakra } from '@chakra-ui/react';

/**
 * The Netsnek double arrow, in tile coordinates.
 *
 * Taken verbatim from the brand file (Netsnek_logo_with_pattern.svg, shape
 * `arrow15-shape`) and shifted by its pattern origin (58, 44) so the tile
 * starts at 0, 0. The glyph then occupies 1..55 on x and 1..45 on y inside a
 * 56 unit tile, which is the spacing the brand file uses.
 */
const ARROW_PATH =
  'M 30.99 1 L 28 1 L 31 11 L 1 11 L 4 21 L 50.99 21 Z ' +
  'M 52 25 L 5.01 25 L 25.01 45 L 28 45 L 25 35 L 55 35 Z';

/** Tile size of the brand pattern, in its own units. */
const TILE = 56;

/** Half a tile: the diagonal stagger the brand file applies to its copies. */
const HALF = TILE / 2;

/**
 * Centre of the glyph within its tile, in tile units. The path spans 1..55 on
 * x and 1..45 on y, so its body sits down and to the right of the cell origin.
 * The pointer is measured against this centre, otherwise the arrow that lights
 * up is the one up and to the left of the cursor.
 */
const GLYPH_CENTER_X = 28;
const GLYPH_CENTER_Y = 23;

export interface ArrowPatternProps {
  /** Vertical offset of the pattern against the section above it. */
  yOffset?: number;
  /** Light up an arrow under the pointer. */
  interactive?: boolean;
  /**
   * Tile edge in CSS pixels. The brand tile is 56 units, which is logo scale
   * and far too fine across a full hero, so it is scaled up by default.
   */
  size?: number;
  [key: string]: any;
}

/**
 * One arrow of the lattice.
 *
 * The lattice is diagonal: the brand pattern places a copy every half tile in
 * both axes, so cell (i, j) sits at (HALF*(i+j), HALF*(i-j)). Feeding the same
 * index pair through {@link cellToPixel} and back through the pointer maths
 * keeps the lit arrow exactly under the pointer.
 */
function Arrow({
  i,
  j,
  size,
  ...props
}: {
  i: number;
  j: number;
  size: number;
  [key: string]: any;
}) {
  const scale = size / TILE;
  const x = HALF * (i + j) * scale;
  const y = HALF * (i - j) * scale;

  return (
    <motion.path
      transform={`translate(${x} ${y}) scale(${scale})`}
      d={ARROW_PATH}
      {...props}
    />
  );
}

/**
 * The hero backdrop: the Netsnek arrow tiled as an outline, with an arrow
 * lighting up under the pointer.
 *
 * Replaces the generic rounded rhombus grid that came with the site template.
 * The tiling, the stagger and the glyph are the brand file's; only the fill is
 * dropped in favour of an outline, and the pointer highlight is kept from the
 * previous component so the page behaves as before.
 */
export function ArrowPattern({
  yOffset = 0,
  interactive = false,
  size = 112,
  ...props
}: ArrowPatternProps) {
  const id = useId();
  const ref = useRef<SVGSVGElement>(null);
  const currentCell = useRef<[number, number] | null>(null);
  const counter = useRef(0);
  const [litArrows, setLitArrows] = useState<Array<[number, number, number]>>(
    []
  );

  // A few arrows that are always on, so the pattern has some weight even
  // before the pointer arrives. Cells, not pixels.
  const staticArrows: Array<[number, number]> = [
    [1, 1],
    [3, 0],
    [4, 3],
    [6, 1],
    [7, 4],
    [5, 6]
  ];

  useEffect(() => {
    if (!interactive) return;

    function onMouseMove(event: MouseEvent) {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      let x = event.clientX - rect.left;
      let y = event.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

      // The lattice is anchored at the horizontal centre, matching the
      // x="50%" on the tiling rect below.
      x = x - rect.width / 2;
      y = y - yOffset;

      // Invert the cell placement. An arrow at (i, j) is drawn at
      // (HALF*(i+j), HALF*(i-j)) in tile units, so
      //   i + j = X / HALF   and   i - j = Y / HALF
      // which solves to i = (X+Y)/TILE and j = (X-Y)/TILE. Measuring from the
      // glyph centre and rounding picks the arrow nearest the pointer rather
      // than the cell it happens to fall into.
      const scale = size / TILE;
      const X = x / scale - GLYPH_CENTER_X;
      const Y = y / scale - GLYPH_CENTER_Y;
      const i = Math.round((X + Y) / TILE);
      const j = Math.round((X - Y) / TILE);

      if (currentCell.current?.[0] === i && currentCell.current?.[1] === j) {
        return;
      }

      currentCell.current = [i, j];

      setLitArrows(arrows => {
        const key = counter.current++;
        return [...arrows, [i, j, key] as [number, number, number]].filter(
          arrow => !(arrow[0] === i && arrow[1] === j && arrow[2] !== key)
        );
      });
    }

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [yOffset, interactive, size]);

  return (
    <chakra.svg ref={ref} aria-hidden="true" {...props}>
      <rect width="100%" height="100%" fill={`url(#${id})`} strokeWidth="0" />
      <chakra.svg x="50%" y={yOffset} strokeWidth="0" overflow="visible">
        {staticArrows.map(([i, j]) => (
          <Arrow key={`${i}:${j}`} i={i} j={j} size={size} />
        ))}
        {litArrows.map(([i, j, key]) => (
          <Arrow
            key={key}
            i={i}
            j={j}
            size={size}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, times: [0, 0, 1] }}
            onAnimationComplete={() => {
              setLitArrows(arrows => arrows.filter(a => a[2] !== key));
            }}
          />
        ))}
      </chakra.svg>
      <defs>
        <pattern
          id={id}
          width={size}
          height={size}
          x="50%"
          patternUnits="userSpaceOnUse"
          patternTransform={`translate(0 ${yOffset})`}
          fill="none"
        >
          <chakra.g transform={`scale(${size / TILE})`}>
            {/* The base tile plus the four wrap copies from the brand file.
                Without them the arrow tips are cut off at the tile edges. */}
            {[
              [0, 0],
              [HALF, HALF],
              [-HALF, HALF],
              [HALF, -HALF],
              [-HALF, -HALF]
            ].map(([dx, dy]) => (
              <path
                key={`${dx}:${dy}`}
                transform={`translate(${dx} ${dy})`}
                d={ARROW_PATH}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </chakra.g>
        </pattern>
      </defs>
    </chakra.svg>
  );
}
