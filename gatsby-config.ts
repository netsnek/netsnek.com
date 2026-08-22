import type { GatsbyConfig } from 'gatsby';

require('dotenv').config({
  path: `.env.public`
});

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: `https://netsnek.com`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  flags: {
    DEV_SSR: false
  },
  plugins: [
    `gatsby-plugin-cloudflare-pages`,
    {
      resolve: `gatsby-plugin-jaen`,
      options: {
        pylonUrl: 'https://services.netsnek.com/jaen/graphql',
        /**
         * CMS media goes to the rebuilt storage gateway rather than the
         * osg.snek.at that jaen defaults to. Only new uploads move: URLs
         * already inside published patches are absolute and keep resolving
         * against the host that issued them, and the new gateway serves those
         * historical Telegram file ids byte for byte.
         */
        storageUrl: 'https://osg.jaen.io',
        remote: {
          repository: 'netsnek/netsnek.com'
        },
        siteUrl: 'https://netsnek.com',
        i18n: {
          defaultLocale: 'de',
          locales: [
            { locale: 'de' },
            { locale: 'en' },
            { locale: 'sl' },
            { locale: 'it' },
            { locale: 'ja' }
          ]
        },
        /**
         * Set JAEN_MOCK_OIDC to sign in against jaen's local mock provider
         * instead of Zitadel:
         *
         *   node ../jaen/tests/support/mock-oidc.mjs        # in one terminal
         *   JAEN_MOCK_OIDC=1 yarn develop                   # in another
         *
         * and log in with admin / jaen. It exists so the CMS can be looked at
         * in its signed-in state without an account, which is the only way to
         * compare it against a previous build.
         *
         * organizationId is deliberately absent in that mode. jaen then derives
         * a plain OIDC scope rather than Zitadel's URN scopes, so this also
         * exercises the generic path. The Zitadel user-management screens under
         * /cms/accounts stay unavailable, because they talk to Zitadel's API
         * and there is nothing local to talk to.
         *
         * The variable is read at config time, so it can never reach a
         * production build: that build simply does not set it.
         */
        zitadelGql: process.env.JAEN_MOCK_OIDC
          ? {
              clientId: 'jaen-dev',
              authority:
                process.env.JAEN_MOCK_OIDC_URL || 'http://127.0.0.1:9099',
              redirectUri: 'http://localhost:8000',
              rolesClaim: 'roles'
            }
          : {
              organizationId: '268210807970535009',
              clientId: '268283382465631862@cms',
              authority: 'https://accounts.netsnek.com',
              redirectUri:
                process.env.NODE_ENV === 'production'
                  ? 'https://netsnek.com'
                  : 'http://localhost:8000',
              projectIds: ['268283277977065078']
            },
        googleAnalytics: {
          trackingIds: ['G-7PWLR452L9']
        }
      }
    },
    {
      resolve: `gatsby-jaen-emailwerk`,
      options: {
        url: 'https://emailwerk.com/graphql'
      }
    },
    //`gatsby-jaen-lens`
  ]
};

export default config;
