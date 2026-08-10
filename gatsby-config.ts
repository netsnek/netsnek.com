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
        zitadelGql: {
          organizationId: '268210807970535009',
          clientId: '268283382465631862@cms',
          authority: 'https://accounts.netsnek.com',
          redirectUri:
            process.env.NODE_ENV === 'production'
              ? 'https://netsnek.com'
              : 'http://localhost:8000',
          projectIds: [
            '268283277977065078'
          ]
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
