// API Details: https://wikimedia.org/api/rest_v1/#/Pageviews%20data/get_metrics_pageviews_top__project___access___year___month___day_

export interface ITopWikiArticle {
  /**
   * Article title
   */
  article: string,
  /**
   * View count
   */
  views: number,
  /**
   * Rank (most viewed = 1)
   */
  rank: number;
}

interface ITopWikiResponseItem {
  project: string;
  access: string;
  year: string;
  month: string;
  day: string;
  articles: ITopWikiArticle[];
}

interface ITopWikiResponse {
  items: ITopWikiResponseItem[];
};

/**
 * Return date as YYYY/MM/DD string
 */
export const formatApiDate = (date: Date) => {
  const year = `${date.getFullYear()}`;
  const month = `${date.getMonth() + 1}`;
  const day = `${date.getDate()}`;
  return `${year}/${month.length === 1 ? `0${month}` : month}/${day.length === 1 ? `0${day}` : day}`;
}

const baseApiUrl = "https://wikimedia.org/api/rest_v1";
const project = "en.wikipedia";
export const getUrl = (day: Date) =>
  `${baseApiUrl}/metrics/pageviews/top/${project}/all-access/${formatApiDate(day)}`;

/**
 * Retrieve ranked list of top viewed Wikipedia articles for a given day.
 */
export const getTopWikipediaArticlesForDay = async (day: Date): Promise<ITopWikiArticle[]> => {
  const url = getUrl(day);
  const apiResult: ITopWikiArticle[] | Error = await fetch(
    url,
    {
      headers: {
        // Provide contact info to Wikimedia as part of API contract
        "Api-User-Agent": "znewton13@gmail.com",
      },
    })
    .then((response) => {
      if (!response.ok) {
        console.log(response);
        throw new Error(`${response.status} - Request to get top wiki articles failed`);
      }
      return response.json();
    })
    .then((wikiResponse: ITopWikiResponse ) => {
      return wikiResponse.items[0].articles;
    })
    .catch((e) => {
      throw (e instanceof Error ? e : new Error(e));
    });
  return apiResult;
};
