/**
 * The tablet mockup of the hero, as vector.
 *
 * This replaces the rasterised `static/images/iPad.png`. Every measurement
 * comes from that PNG (700x560), so the SVG can be dropped in at any size and
 * stay crisp. The only bitmap left is the Apple Pencil, which is a real
 * gradient-shaded drawing and lives in `static/images/ipad-pencil.png`.
 *
 * The markup is written to be edited by hand in the browser editor: the groups
 * are commented in German, and every colour is a literal hex value. The
 * comments are MDX comments rather than `<!-- -->`, because the editor parses
 * the document as MDX, where an HTML comment is a syntax error.
 */

/**
 * The mockup with something on its screen.
 *
 * `artwork` is dropped into the empty group on the white page, so the tablet
 * and whatever it shows stay a single document.
 */
export const buildMockup = (artwork: string = ''): string =>
  `<svg viewBox="0 0 700 560" width="100%" height="100%"
     xmlns="http://www.w3.org/2000/svg"
     role="img" aria-label="Tablet mit geoeffneter netsnek.com Seite">

  <defs>
    {/* Schlagschatten des Geraets: nach rechts unten versetzt, weich */}
    <filter id="mockup-shadow" x="-10%" y="-10%" width="130%" height="130%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="4.9" />
      <feOffset dx="6.75" dy="8.5" result="mockup-shadow-shape" />
      <feFlood flood-color="#000000" flood-opacity="0.39" />
      <feComposite in2="mockup-shadow-shape" operator="in" />
      <feMerge>
        <feMergeNode />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    {/* Bildschirmausschnitt: schneidet Toolbar und Inhalt auf runde Ecken */}
    <clipPath id="mockup-screen-clip">
      <rect x="19.5" y="40.19" width="647" height="480.36" rx="9" ry="9" />
    </clipPath>
  </defs>

  {/* ============================================================
       1. GERAET
       Heller Aluminiumrand (Rim) mit Schatten, darauf der schwarze
       Korpus. Der Rim ist links vom Rand des Bildes angeschnitten.
       ============================================================ */}
  <g id="device">
    <rect x="-1.42" y="18.59" width="685.32" height="523.11" rx="29.3" ry="29.3"
          fill="#e9e9e9" filter="url(#mockup-shadow)" />
    <rect x="1.758" y="21.508" width="678.909" height="516.977"
          rx="26.18" ry="26.18" fill="#010101" />
  </g>

  {/* ============================================================
       2. BILDSCHIRM
       Der Ausschnitt im Rahmen. Die Ecken sind bewusst rund
       (rx = 9), konzentrisch zum Gehaeuse: 26.18 aussen minus
       17.1 Rahmenbreite. Alles Folgende liegt in diesem Clip.
       ============================================================ */}
  <g id="screen" clip-path="url(#mockup-screen-clip)">

    {/* Grundflaeche des Bildschirms, zugleich Farbe der Toolbar */}
    <rect x="19.5" y="40.19" width="647" height="480.36" fill="#2a2731" />

    {/* ============================================================
         3. BROWSERLEISTE (Safari Toolbar), y 40.19 bis 71.5
         Die optische Mitte der Symbole liegt bei y 53.8, also ein
         bis zwei Pixel ueber der geometrischen Mitte der Leiste.
         ============================================================ */}
    <g id="chrome-bar">

      {/* Symbole links: Seitenleiste, Aufklapp-Pfeil, Zurueck, Vor */}
      <g id="chrome-left" fill="none" stroke="#84828e"
         stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
        {/* Seitenleisten-Schalter: Rechteck mit Trennlinie */}
        <rect x="30.5" y="49.5" width="11" height="8" rx="1.5" ry="1.5" />
        <line x1="35" y1="49.5" x2="35" y2="57.5" />
        {/* kleiner Pfeil nach unten daneben */}
        <path d="M 48.4 52.9 L 50.2 55.2 L 52.0 52.9" stroke="#aaa8b2"
              stroke-width="1.1" />
        {/* Zurueck */}
        <path d="M 70.2 50.4 L 66.7 53.9 L 70.2 57.4" stroke="#8f8b96"
              stroke-width="1.2" />
        {/* Vor, ausgegraut weil es keine Vorwaertsseite gibt */}
        <path d="M 85.9 50.4 L 89.4 53.9 L 85.9 57.4" stroke="#423d4a"
              stroke-width="1.2" />
      </g>

      {/* Lesemodus / Darstellung: Kreis, linke Haelfte gefuellt */}
      <g id="chrome-reader">
        <path d="M 238.2 49.8 A 4 4 0 0 0 238.2 57.8 Z" fill="#9490a0" />
        <circle cx="238.2" cy="53.8" r="4" fill="none" stroke="#aca8b3"
                stroke-width="1" />
      </g>

      {/* ============================================================
           Adressfeld: Schloss und URL stehen im Original ohne
           Pille direkt auf der Leiste, und zwar rechts der Mitte.
           Wer doch eine Pille moechte, entfernt die Kommentar-
           zeichen der naechsten Zeile.
           ============================================================ */}
      <g id="chrome-address">
        {/* <rect x="375" y="45" width="66" height="22" rx="11" fill="#35323d" /> */}

        {/* Schloss: Buegel oben offen, Korpus darunter */}
        <path d="M 387.2 53.8 L 387.2 52.9 A 1.3 1.3 0 0 1 389.8 52.9 L 389.8 53.8"
              fill="none" stroke="#e8e4f1" stroke-width="0.9" />
        <rect x="386" y="53.8" width="5" height="3.8" rx="0.9" ry="0.9"
              fill="#e8e4f1" />

        {/* Die Adresse. Im Original stand hier photonq.at. */}
        <text x="394.5" y="57.5" fill="#cdc9d3" font-size="7.8" font-family="system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif" font-weight="400">netsnek.com</text>
      </g>

      {/* Symbole rechts: Tabuebersicht und Neu laden */}
      <g id="chrome-right" fill="none" stroke-linecap="round"
         stroke-linejoin="round">
        {/* hinteres Quadrat, gedimmt */}
        <rect x="541.6" y="50.7" width="4.3" height="4.3" rx="1" ry="1"
              stroke="#e1ddea" stroke-width="1.1" opacity="0.55" />
        {/* vorderes Quadrat, deckt das hintere ab */}
        <rect x="546.9" y="52.0" width="4.2" height="4.2" rx="1" ry="1"
              fill="#2a2731" stroke="#e1ddea" stroke-width="1.1" />
        {/* Neu laden: Kreis mit Luecke oben rechts und Pfeilspitze */}
        <path d="M 560.49 53.85 A 2.9 2.9 0 1 1 558.83 51.47"
              stroke="#918d97" stroke-width="1.05" />
        <polygon points="556.8,50.5 559.3,51.5 557.0,52.8" fill="#918d97"
                 stroke="none" />
      </g>
    </g>

    {/* ============================================================
         4. INHALTSFLAECHE
         Die weisse Seite unter der Leiste. Sie erbt die runden
         unteren Ecken aus dem Clip des Bildschirms.
         ============================================================ */}
    <rect id="content" x="19.5" y="71.5" width="647" height="449.05"
          fill="#ffffff" />

    {/* ============================================================
         5. DIE ANIMIERTE MARKE
         Der Inhalt gehoert in den Bereich x 19.5 bis 666.5,
         y 71.5 bis 520.55.
         ============================================================ */}
    <g id="artwork">${artwork}</g>
  </g>

  {/* ============================================================
       6. APPLE PENCIL
       Echtes Bitmap mit Verlauf, liegt zuletzt und deshalb ueber
       der Oberkante des Rahmens. Oben vom Bildrand angeschnitten,
       y muss exakt 0 bleiben.
       ============================================================ */}
  <image href="/images/ipad-pencil.png" x="133" y="0" width="429" height="19" />
</svg>`;

/** The bare tablet, with nothing on its screen. */
export const MOCKUP_SVG = buildMockup();

export default MOCKUP_SVG;
