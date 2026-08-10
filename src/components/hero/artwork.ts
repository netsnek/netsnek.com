/**
 * The animated brand mark, as markup for the hero playground.
 *
 * This is the SVG body of `src/gatsby-plugin-jaen/components/Netsnek.tsx`,
 * rewritten as plain SVG so it can live inside the document the visitor
 * edits: `className` became `class`, the camelCase presentation attributes
 * became dashed ones, and the styles the hero used to pass as a Chakra `sx`
 * prop are now ordinary rules in the mark's own `<style>` block.
 *
 * Three things are deliberately different from the component:
 *
 * - Everything is wrapped in a nested `<svg viewBox="0 0 475 475">`. The mark
 *   uses percentages (`y="34%"`, `stroke-width="10%"`) and `transform-origin:
 *   center`, and both are resolved against the nearest viewport. Without the
 *   nested viewport they would suddenly refer to the 700x560 tablet and the
 *   mark would fall apart.
 * - Every id and every keyframe name carries a `mark-` prefix, and the mark
 *   itself is `netsnek-mark`. The same mark is rendered a second time in the
 *   footer with an unscoped `<style>` block of its own, and the wordmark of
 *   the navigation already owns the id `mark`, so without the prefix the
 *   three would share ids, masks and animations.
 * - The rules are scoped under `#netsnek-mark`, so editing them in the hero
 *   cannot reach either of the other two.
 *
 * The CSS sits in a fenced code block inside the `<style>` element. The field
 * parses MDX, where a bare `{` opens an expression, and a fence is the one
 * place where braces, comments and indentation survive untouched.
 */

export interface ArtworkLabels {
  /** First heading without its terminator, painted through its own mask. */
  heading1: string;
  /** The terminator of the first heading, painted in the brand colour. */
  dot1: string;
  /** Second heading without its terminator. */
  heading2: string;
  /** The terminator of the second heading. */
  dot2: string;
}

/**
 * Makes a localized string safe as MDX text.
 *
 * Nothing in the message catalog needs this today, but the seed is built from
 * translations, and a stray brace or angle bracket in one of them would take
 * the whole hero down rather than just look wrong.
 */
const escapeMdx = (text: string): string => text.replace(/([\\{}<>])/g, '\\$1');

/**
 * The mark, ready to be dropped into the tablet's artwork slot.
 *
 * The nested viewport is placed inside the white page of the mockup: 536
 * units wide at x 75, y 27.5, which puts the drawn ink between y 85 and y 507
 * of the tablet, just inside the page (71.5 to 520.55) and centred on the
 * screen.
 */
export const buildArtwork = (labels: ArtworkLabels): string => {
  const heading1 = escapeMdx(labels.heading1);
  const dot1 = escapeMdx(labels.dot1);
  const heading2 = escapeMdx(labels.heading2);
  const dot2 = escapeMdx(labels.dot2);

  return `
    {/* ============================================================
         DIE ANIMIERTE MARKE
         Eigener Ausschnitt (viewBox 0 0 475 475) auf der weissen
         Seite. x, y und die Kantenlaenge bestimmen, wo die Marke
         sitzt, alles darin rechnet weiter in 475er Einheiten.
         ============================================================ */}
    <svg id="netsnek-mark" x="75" y="27.5" width="536" height="536"
         viewBox="0 0 475 475">

      <style>
\`\`\`css
/* Die Marke zeichnet sich selbst: erst die Skizze, dann das Herz,
   dann die Schlange, zuletzt die Ueberschriften und der Button.
   Die Namen tragen alle das Praefix mark-, weil dieselbe Marke im
   Footer ein zweites Mal steht. */

@keyframes mark-draw {
  100% { stroke-dashoffset: 0; }
}

@keyframes mark-erase {
  100% { stroke: transparent; }
}

@keyframes mark-heartbeat {
  0%  { transform: scale(1); }
  40% { transform: scale(1); }
  50% { transform: scale(0.8); }
  55% { transform: scale(0.9); }
  60% { transform: scale(0.7); }
}

@keyframes mark-move-layer2 {
  100% { transform: translateX(250px) translateY(100px) scale(0.5); }
}

@keyframes mark-move-circle1 {
  100% { transform: translateY(-50px); }
}

@keyframes mark-move-circle2 {
  100% { transform: translateX(50px); }
}

@keyframes mark-rotate-heart-wrap {
  100% { transform: translateX(5px) translateY(-8px) rotate(-45deg); }
}

@keyframes mark-fill-heart {
  to { fill: #f77f00; }
}

@keyframes mark-fill-snek {
  to { fill: #ffffff; }
}

/* Die Skizze: Rechteck und zwei Kreise werden gezeichnet und
   nach sechs Sekunden wieder weggewischt. */
#netsnek-mark .rect,
#netsnek-mark .circles,
#netsnek-mark .heart {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
}

#netsnek-mark .rect {
  animation: mark-draw 2s ease forwards,
             mark-erase 1s ease 6s forwards;
}

#mark-layer2 {
  animation: mark-move-layer2 1s 9s forwards;
}

#mark-circle1 {
  animation: mark-draw 2s ease 1s forwards,
             mark-erase 1s ease 6s forwards,
             mark-move-circle1 1s 3s forwards;
}

#mark-circle2 {
  animation: mark-draw 2s ease 1s forwards,
             mark-erase 1s ease 6s forwards,
             mark-move-circle2 1s 3s forwards;
}

#netsnek-mark .heart-wrap {
  animation: mark-rotate-heart-wrap 1s 4s forwards;
  transform-origin: center;
}

/* Das Herz wird gezeichnet, gefuellt und schlaegt danach weiter. */
#mark-heart {
  animation: mark-draw 2s ease 5s forwards,
             mark-fill-heart 0s ease 6s forwards,
             mark-heartbeat 1s infinite 9s;
  stroke-width: 2;
  fill: transparent;
  transform-origin: center;
}

/* Die Schlange wird sichtbar, indem ihre Maske weiss wird. */
#mark-snek-mask path {
  transform-origin: center;
  transform: rotate(-148deg);
  animation: mark-fill-snek 0s ease 7s forwards;
}

#netsnek-mark .snek {
  /* Kein fill. Ein gefuellter Kreis ignoriert stroke-dasharray, die
     Zeichenanimation liefe unsichtbar daran vorbei und die Schlange
     stuende von der ersten Sekunde an fertig da. */
  stroke: #000000;
  filter: drop-shadow(1px 2px 2px rgba(0, 0, 0, 0.1));
  transform-origin: center;
  transform: rotate(148deg);
  stroke-dasharray: 1005;
  stroke-dashoffset: 1005;
  animation: mark-draw 2s ease 7s forwards;
}

/* Der Rahmen und die beiden Markenpfeile gehoeren zur Marke, im
   Hero sind sie aber ausgeblendet. Wer sie sehen will, loescht
   die display-Zeile. */
#netsnek-mark .squarel {
  display: none;
}

#netsnek-mark .arrows {
  display: none;
}

/* Ueberschriften, Akzentpunkte, Skelettzeilen und Button werden
   nacheinander durch ihre Masken gewischt. */
#mark-heading1,
#mark-heading2,
#mark-dot1,
#mark-dot2,
#mark-skeleton1,
#mark-skeleton2,
#mark-button {
  stroke-dasharray: 1005;
  stroke-dashoffset: 1005;
}

#mark-heading1,
#mark-dot1 {
  animation: mark-draw 1s ease 10s forwards;
}

#mark-heading2,
#mark-dot2 {
  animation: mark-draw 1s ease 11s forwards;
}

#mark-skeleton1,
#mark-skeleton2 {
  animation: mark-draw 1s ease 12s forwards;
}

#mark-button {
  animation: mark-draw 1s ease 13s forwards;
}
\`\`\`
      </style>

      <defs>
        {/* Die Schlange ist ein dicker Kreisbogen, den diese Maske
             auf die Form der Netsnek-Schlange beschneidet. */}
        <mask id="mark-snek-mask">
          <path fill="transparent" d="M 67.96 315.77 C 10.57 175.42 137.60 29.35 285.30 68.14 373.68 90.97 432.59 181.50 415.78 270.48 402.01 355.71 318.60 420.34 232.48 411.24 191.57 407.79 152.52 388.78 125.35 358.75 124.20 357.60 124.61 356.08 125.35 354.93 126.50 354.19 128.06 354.19 128.80 354.93 157.49 380.80 195.39 395.24 232.89 395.61 329.29 397.14 403.53 305.11 379.03 213.06 366.41 162.87 324.72 121.78 273.83 110.75 225.24 99.73 170.89 117.99 138.75 156.78 106.60 194.42 97.80 249.95 117.70 295.20 129.95 328.31 82.88 347.69 67.96 315.77 Z" />
        </mask>

        {/* Die Ueberschriften stehen nur in den Masken, gemalt wird
             der Strich der Rechtecke weiter unten. */}
        <mask id="mark-heading1-mask">
          <text x="0" y="160" font-size="32" font-weight="bold" fill="#ffffff">${heading1}</text>
        </mask>
        <mask id="mark-heading2-mask">
          <text x="0" y="190" font-size="24" font-weight="bold" fill="#ffffff">${heading2}</text>
        </mask>

        {/* Fuer den Akzentpunkt bleibt der Text schwarz, weiss ist
             nur der Schlusspunkt. */}
        <mask class="dots-mask" id="mark-dot1-mask">
          <text x="0" y="160" font-size="32" font-weight="bold" fill="#000000">${heading1}<tspan fill="#ffffff">${dot1}</tspan></text>
        </mask>
        <mask class="dots-mask" id="mark-dot2-mask">
          <text x="0" y="190" font-size="24" font-weight="bold" fill="#000000">${heading2}<tspan fill="#ffffff">${dot2}</tspan></text>
        </mask>

        <mask id="mark-button-mask">
          {/* Erster Button gefuellt, zweiter nur Umriss, genau wie das
              Buttonpaar der echten Seite. Radius 6 von 20 Einheiten Hoehe
              entspricht den 12px der Website. */}
          <rect x="2" y="250" rx="6" ry="6" width="50" height="20" fill="#ffffff" />
          <rect x="61" y="251" rx="5" ry="5" width="48" height="18"
                fill="none" stroke="#ffffff" stroke-width="2" />
        </mask>
      </defs>

      {/* Der Rahmen der Marke, im Hero ausgeblendet */}
      <g id="mark-layer1">
        <path class="squarel" d="M425.2,49.62C380.42,4.99,316.03,0,237.33,0S94.09,5.05,49.31,49.78,0,158.9,0,237.59s4.53,143.14,49.31,187.87c44.78,44.73,109.23,49.26,188.02,49.26s143.24-4.53,188.02-49.26c44.78-44.73,49.31-109.12,49.31-187.87,.05-78.8-4.58-143.29-49.46-187.97h0Z" />
      </g>

      {/* Schlange, Skizze, Herz und die beiden Markenpfeile */}
      <g id="mark-layer2">
        <circle class="snek" cx="238" cy="238" r="160" fill="transparent"
                stroke="#1A202C" stroke-width="54" stroke-linecap="round"
                mask="url(#mark-snek-mask)" />

        <g class="heart-wrap">
          <rect id="mark-rect" class="rect" x="164" y="214" width="100" height="100"
                fill="transparent" stroke="#1A202C" stroke-width="1" />
          <circle id="mark-circle1" class="circles" cx="214" cy="264" r="50"
                  fill="transparent" stroke="#1A202C" stroke-width="1" />
          <circle id="mark-circle2" class="circles" cx="214" cy="264" r="50"
                  fill="transparent" stroke="#1A202C" stroke-width="1" />
          <path id="mark-heart" class="heart" fill="transparent" stroke="#f77f00"
                d="M 264.00,214.00 C 291.61,214.00 314.00,236.39 314.00,264.00 314.00,291.61 291.61,314.00 264.00,314.00 264.00,314.00 164.00,314.00 164.00,314.00 164.00,214.00 164.00,214.00 164.00,214.00 164.00,186.39 186.39,164.00 214.00,164.00 241.61,164.00 264.00,186.39 264.00,214.00" />
        </g>

        <polygon class="arrows" points="133.97 209.4 260.81 208.99 243.86 164.78 261.63 164.78 332.69 242.45 149.26 242.45 133.97 209.4" />
        <polygon class="arrows" points="350.66 281.29 223.83 281.7 240.77 325.91 223 325.91 151.94 248.24 335.38 248.24 350.66 281.29" />
      </g>

      {/* Jede Ueberschrift ist ein Rechteck mit dickem Strich, das
           durch seine Maske sichtbar wird. */}
      <g mask="url(#mark-heading1-mask)">
        <rect id="mark-heading1" x="-47.5" y="161.5" width="475" height="237.5"
              fill="none" stroke="#1A202C" stroke-width="47.5" stroke-linecap="round" />
      </g>
      <g mask="url(#mark-heading2-mask)">
        <rect id="mark-heading2" x="-47.5" y="194.75" width="475" height="237.5"
              fill="none" stroke="#1A202C" stroke-width="47.5" stroke-linecap="round" />
      </g>
      <g mask="url(#mark-dot1-mask)">
        <rect id="mark-dot1" x="-47.5" y="161.5" width="475" height="237.5"
              fill="none" stroke="#f77f00" stroke-width="47.5" stroke-linecap="round" />
      </g>
      <g mask="url(#mark-dot2-mask)">
        <rect id="mark-dot2" x="-47.5" y="194.75" width="475" height="237.5"
              fill="none" stroke="#f77f00" stroke-width="47.5" stroke-linecap="round" />
      </g>

      {/* Zwei angedeutete Textzeilen und der angedeutete Button */}
      <line id="mark-skeleton1" x1="4" y1="215" x2="196" y2="215" stroke="#000000"
            opacity="0.2" stroke-width="8" stroke-linecap="round" />
      <line id="mark-skeleton2" x1="4" y1="230" x2="196" y2="230" stroke="#000000"
            opacity="0.2" stroke-width="8" stroke-linecap="round" />

      <g mask="url(#mark-button-mask)">
        <rect id="mark-button" x="-47.5" y="270.75" width="475" height="237.5"
              fill="none" stroke="#f77f00" stroke-width="47.5" stroke-linecap="round" />
      </g>
    </svg>
`;
};

export default buildArtwork;
