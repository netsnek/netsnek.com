export type SearchIndex = Record<
  string,
  {
    id: string;
    type?: string;
    title: string;
    data: Record<string, string>;
  }
>;

/**
 * Shape of public/search-index.json: one sub-index per site locale
 * (`{de: {...}, en: {...}, ...}`), built in gatsby-node's onPostBuild.
 */
export type LocalizedSearchIndex = Record<string, SearchIndex>;
