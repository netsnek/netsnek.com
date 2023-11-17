import type {GatsbyConfig} from 'gatsby'

const config: GatsbyConfig = {
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  flags: {
    DEV_SSR: true
  },
  jsxRuntime: 'automatic',
  plugins: [
    {
      resolve: `gatsby-plugin-jaen`,
      options: {
        snekResourceId: `2c1408ca-84bb-4981-af1f-7d63b2b6f34d`
      }
    },
    {
      resolve: `gatsby-jaen-mailpress`,
      options: {}
    }
  ]
}

export default config
