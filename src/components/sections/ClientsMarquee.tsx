import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import {
  Box,
  BoxProps,
  Image,
  LinkBox,
  LinkOverlay,
  useBreakpointValue
} from '@chakra-ui/react';
import { StaticImage } from 'gatsby-plugin-image';
import Marquee from 'react-fast-marquee';

// Defining type for a single client
interface Client {
  href: string;
  name: string;
  /**
   * The finished logo element, not a path.
   *
   * These logos are not jaen fields. They are a hard coded list in this file,
   * so there is no media id to point at and the CMS route AGENTS.md describes
   * does not apply. The two raster logos go through `StaticImage` instead,
   * which is the one way to get gatsby-plugin-image treatment (AVIF, WebP, a
   * srcset and a reserved box) out of a file that no `Field.Image` owns.
   * gatsby-plugin-image is registered by gatsby-plugin-jaen's theme config,
   * so this needs no plugin change.
   *
   * The vector logos stay a plain `<Image>`: sharp cannot process an SVG and
   * there is nothing to win, the file is already as small as it gets.
   */
  logo: ReactNode;
}

/**
 * How the `sizes` below were derived, not guessed.
 *
 * Each tile is a `LinkBox` of `boxSize` 230px at base and 260px from md
 * (768px) up, with `p="2"` — 8px a side. The logo therefore occupies
 * 230 - 16 = 214px, and 260 - 16 = 244px from md up. Hence
 * `(min-width: 768px) 244px, 214px`.
 *
 * `width` is 240 rather than 244, which reads arbitrary and is not. The
 * constrained layout multiplies the width by 0.25 / 0.5 / 1 / 2 and then
 * *drops* every step wider than the source instead of clamping it
 * (`responsiveImageSizes` in gatsby-plugin-image). andenken-schenken.png is
 * 482px wide, so a width of 244 would ask for 488w, lose it by six pixels and
 * leave nothing above 244w for a 2x screen. 240 asks for 480w and keeps it.
 *
 * `loading="eager"` keeps today's behaviour. react-fast-marquee mounts only
 * on the client and then translates its children, and a lazy image inside a
 * transformed track is not reliably intersected, which shows up as blank
 * tiles.
 *
 * Quality is left at the site default. AVIF at that setting is fine for the
 * homepage photographs; whether a wordmark of this size stays crisp has not
 * been measured, so if the lettering looks soft, `quality={80}` is the knob.
 */
const clients: Client[] = [
  {
    href: 'https://www.agt-guntrade.at/',
    name: 'AGT Gun Trade',
    logo: (
      <Image
        src="/images/clients/agt.svg"
        alt="AGT Gun Trade"
        boxSize="full"
        objectFit="contain"
      />
    )
  },
  {
    href: 'https://www.univie.ac.at/',
    name: 'Universität Wien',
    logo: (
      <Image
        src="/images/clients/univie.svg"
        alt="Universität Wien"
        boxSize="full"
        objectFit="contain"
      />
    )
  },
  {
    href: 'https://www.ballons-ballons.at/',
    name: 'Ballons & Ballons',
    logo: (
      <Image
        src="/images/clients/ballons.svg"
        alt="Ballons & Ballons"
        boxSize="full"
        objectFit="contain"
      />
    )
  },
  {
    href: 'https://www.pharmaziegasse.at/',
    name: 'Pharmaziegasse',
    logo: (
      <Image
        src="/images/clients/pharmaziegasse.svg"
        alt="Pharmaziegasse"
        boxSize="full"
        objectFit="contain"
      />
    )
  },
  {
    href: 'https://www.andenkenschenken.at/',
    name: 'Andenken Schenken',
    logo: (
      // The path is relative to this file and lands on the same file under
      // `static/`. StaticImage resolves it with path.resolve against the
      // source directory, so it does not have to live under `src/`. The
      // static copy stays where it is, nothing else references it.
      <StaticImage
        src="../../../static/images/clients/andenken-schenken.png"
        alt="Andenken Schenken"
        layout="constrained"
        width={240}
        sizes="(min-width: 768px) 244px, 214px"
        formats={['auto', 'webp', 'avif']}
        placeholder="none"
        loading="eager"
        objectFit="contain"
      />
    )
  },
  {
    href: 'https://www.citypension.at/',
    name: 'City Pension',
    logo: (
      <StaticImage
        src="../../../static/images/clients/citypension.png"
        alt="City Pension"
        layout="constrained"
        width={240}
        sizes="(min-width: 768px) 244px, 214px"
        formats={['auto', 'webp', 'avif']}
        placeholder="none"
        loading="eager"
        objectFit="contain"
      />
    )
  }
];
// Defining type for the component props
interface ClientsMarqueeProps extends BoxProps {
  // clients: Client[];
}

const ClientsMarquee: FC<ClientsMarqueeProps> = ({ ...props }) => {
  // Defaulting to a 16:9 aspect ratio
  // For TypeScript, setting explicit return types on hooks is not typically necessary due to its inference
  const boxSize = useBreakpointValue({ base: '230px', md: '260px' });

  const sectionRef = useRef<HTMLDivElement>(null);

  /**
   * The marquee starts when it is about to be seen, not when the page loads.
   *
   * `react-fast-marquee` measures itself and its track with two
   * `getBoundingClientRect()` calls as soon as it mounts, and then animates
   * continuously. Lighthouse attributed 33 ms of forced reflow at load to that
   * pair, for a section that sits below the fold on every viewport.
   *
   * Deferring only the marquee is safe because the height is already reserved
   * by `minH` below, so nothing moves when it does appear. `rootMargin` starts
   * it a little early, which means it is running by the time it is on screen
   * rather than starting visibly from a standstill.
   */
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;

    if (!node) return;

    // Without IntersectionObserver the marquee simply runs from the start,
    // which is the behaviour this replaced.
    if (typeof IntersectionObserver === 'undefined') {
      setIsNear(true);
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setIsNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px 0px' }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Box
      ref={sectionRef}
      as="section"
      /**
       * The height is reserved in CSS, not left to the marquee.
       *
       * react-fast-marquee renders nothing until it has mounted, so the
       * section is empty in the statically generated HTML and grows to 230px
       * at hydration, pushing everything below it down. Measured at 412px that
       * is a 0.24 layout shift, the whole of the page's CLS.
       *
       * It never showed in v2 because the hero above it stayed at opacity 0
       * until hydration finished, and a shift of invisible area does not
       * count. Making the hero paint early exposed a shift that was always
       * there.
       *
       * The values are `boxSize` below, which cannot be used here: it comes
       * from useBreakpointValue and is undefined during the build.
       */
      minH={{base: '230px', md: '260px'}}
      {...props}>
      {isNear && (
      <Marquee gradient={false} speed={60}>
        <Box display="flex" gridGap="32px">
          {clients.map((client, index) => (
            <LinkBox
              key={index}
              display="flex"
              alignItems="center"
              justifyContent="center"
              width={boxSize}
              height={boxSize}
              p="2"
              mx="16"
              overflow="hidden"
            >
              <LinkOverlay
                href={client.href}
                target="_blank"
                rel="noopener noreferrer"
                // The tile holds only a logo, so the anchor has no text of its
                // own and every one of them reached the DOM unnamed.
                aria-label={client.name}
              >
                {client.logo}
              </LinkOverlay>
            </LinkBox>
          ))}
        </Box>
      </Marquee>
      )}
    </Box>
  );
};

export default ClientsMarquee;
